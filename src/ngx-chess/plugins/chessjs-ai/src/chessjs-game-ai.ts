import { Injectable, NgZone } from '@angular/core';
import { FishWrap, POSITION_SET_TYPE, OPTION_NAME } from 'es6-stockfish';

import {
  Block,
  Piece,
  PieceType,
  ChessMove,
  AIQuery
} from 'ngx-chess';

import { ChessJSGame, util } from 'ngx-chess/plugins/chessjs';

import { StockfishFactory } from './stockfish-provider';

/**
 * A Chess game controller using the chess.js game controller and stockfish as AI.
 */
@Injectable()
export class ChessJSGameAI extends ChessJSGame {
  /**
   * @internal
   */
  public fishWrap: FishWrap;
  // history for fish wrap engine in LAN
  private fwHistory: string[];

  get aiReady(): boolean {
    return this.fishWrap && this.fishWrap.isInit;
  }
  get aiSupported(): boolean {
    return true;
  }

  get aiLevel(): number {
    if (this.fishWrap.isInit) {
      return this.fishWrap.meta.option.SkillLevel.value / 2;
    }
    throw new Error('Engine did not initialize.');
  }

  set aiLevel(level: number) {
    if (level > 10) level = 10;
    if (level < 0) level = 0;
    if (this.aiLevel === level) return;

    level *= 2;

    if (!this.fishWrap.isInit) {
      throw new Error('Engine did not initialize.');
    }

    // NOTE: Stockfish level 20 does not make errors (intentially),
    // so these numbers have no effect on level 20.
    const maxErr = Math.round((level * -0.25) + 5),     // Level 0 starts at 5
          probability = Math.round((level * 6.35) + 1); // Level 0 starts at 1

    this.fishWrap.setoption(OPTION_NAME.SkillLevel, level);
    this.fishWrap.setoption(OPTION_NAME.SkillLevelMaximumError, maxErr);
    this.fishWrap.setoption(OPTION_NAME.SkillLevelProbability, probability);

    // NOTE: Could clear the hash to make the player more like it's brand new.
    // this.fishWrap.setoption(OptionRequest.create(OPTION_NAME.ClearHash));
  }

  constructor(private stockfishProvider: StockfishFactory, private zone: NgZone) {
    super();
  }

  init(): Promise<void> {
    return super.init()
      .then( () => {
        if (!this.fishWrap) {
          // const debug = 'development' === ENV;
          this.fishWrap = new FishWrap(() => this.stockfishProvider.create() /* , debug */);
        }

        return this.fishWrap.uci();
      });
  }

  newGame(): Promise<void> {
    return super.newGame()
      .then( () => this.init() )
      .then( () => {
        this.fwHistory = [];
        return this.fishWrap.stop()
          .then( _ => this.fishWrap.ucinewgame() )
          .then( _ => <any>this.fishWrap.position(POSITION_SET_TYPE.startpos) );
      });
  }

  move(piece: Piece, toBlock: Block, promotion?: PieceType): ChessMove {
    const move = super.move(piece, toBlock, promotion);

    // update the engine
    if (!move.invalid && this.aiReady) {
      let lan = `${move.from}${move.to}${move.promotion ? util.piece.to(move.promotion) : ''}`;
      this.fwHistory.push(lan);
      this.fishWrap.position(POSITION_SET_TYPE.startpos, this.fwHistory.join(' '));
    }

    return move;
  }

  undo(): ChessMove {
    const move = super.undo();

    if (!move.invalid && this.aiReady) {
      this.fwHistory.pop();
      this.fishWrap.position(POSITION_SET_TYPE.startpos, this.fwHistory.join(' '));
    }

    return move;
  }

  // TOOD: make return type observable so we can cancel.
  aiNextMove(q: AIQuery): Promise<ChessMove> {
    if (!this.aiReady) {
      return Promise.reject<ChessMove>(new Error('AI is not initialized.'));
    }
    return this.fishWrap
      .goDyn(true)
      .depth(q.depth)
      .movetime(q.limit)
      .wtime(q.white.time)
      .winc(q.white.inc)
      .btime(q.black.time)
      .binc(q.black.inc)
      .$post()
      .then( goRes => util.move.factoryLongAlg(goRes.bestMove.move) );
  }

  /**
   * Stops AI processing and perform the last best move found.
   * @returns {Promise<void>}
   */
  aiStop(): Promise<void> {
    return this.fishWrap.stop();
  }

  destroy(): void {
    if (this.fishWrap) {
      this.fishWrap.destroy();
    }
  }
}

