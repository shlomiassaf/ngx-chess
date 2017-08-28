import { Observable } from 'rxjs/Observable';
import { PlayerType, GAME_STATE, PieceColor, PieceType } from '../models/enums';
import { AIQuery, PlayerSettings } from '../models/config';
import { ChessMove } from '../models/ChessMove';
import { Block } from '../models/Block';
import { Piece } from '../models/Piece';
import { ChessEngine } from './ChessEngine';
import { ChessBoard } from './ChessBoard';

const DEFAULT_TIME = 144000; // 2.4 mins

export class ChessBoardController {
  /**
   * Indicates if the AI Engine is processing.
   * @type {boolean}
   */
  aiProcessing: boolean = false;

  readonly stateChanged: Observable<GAME_STATE>;

  get white(): PlayerSettings {
    return this.players[PieceColor.WHITE];
  };

  get black(): PlayerSettings {
    return this.players[PieceColor.BLACK];
  };

  get winner(): PieceColor {
    return this.engine.winner();
  }

  get currentPlayer(): PlayerSettings {
    return this.players[this.engine.turn()];
  }

  get aiSupported(): boolean {
    return this.engine.aiSupported;
  }

  private depth: number;

  // the enum is the index;
  private players: PlayerSettings[] = [null, new PlayerSettings(), new PlayerSettings()];


  constructor(protected board: ChessBoard, protected engine: ChessEngine) {
    this.stateChanged = engine.stateChanged.asObservable();
  }

  /**
   * Let the computer play for a side.
   */
  setPlayer(side: PieceColor, type: PlayerType, aiLevel?: number): this {
    if (side === PieceColor.BLACK) {
      this.black.player = type;
      if (aiLevel > 0) {
        this.black.aiLevel = aiLevel;
      }
    } else if (side === PieceColor.WHITE) {
      this.white.player = type;
      if (aiLevel > 0) {
        this.white.aiLevel = aiLevel;
      }
    }
    return this;
  }

  init(): Promise<void> {
    return this.engine.init();
  }

  /**
   * Initialize a new game.
   * @param useAI Initialize AI, if supported. Defaults to aiSupported.
   * i.e: If useAI is not a boolean the controller will use AI if exists.
   */
  newGame(): Promise<void> {
    return this.board.newGame().then( () => this.engine.newGame())
  }

  move(piece: Piece, toBlock: Block, promotion?: PieceType): Promise<ChessMove> {
    let isAI = this.currentPlayer.player === PlayerType.AI;

    // if we need promotion selection, do that.
    if (!isAI && !promotion && this.engine.isPromotionMove(piece, toBlock)) {
      return this.board.askPromotionType()
        .then(p => this.move(piece, toBlock, p));
    }

    const move = this.engine.move(piece, toBlock, promotion);

    if (!move.invalid) {
      move.effected.filter( p => !!p.block).forEach( p => this.board.move(p) );
    }

    isAI = this.currentPlayer.player === PlayerType.AI;

    // if it's computer turn, make him move.
    if (this.engine.aiReady && isAI) {
      setTimeout(() => this.doNextMove() , 0);
    }

    return Promise.resolve(move);
  }

  highlight(...blocks: Array<Block|string>): void {
    this.board.highlight(blocks.map(b => typeof b === 'string' ? this.engine.getBlock(b) : b));
  }

  aiNextMove(): Promise<ChessMove> {
    this.aiProcessing = true;
    this.setAILevel();
    this.board.blockUi(true);
    this.board.busy(true);

    return this.engine.aiNextMove(this.buildQuery())
      .then( mv => {
        this.aiProcessing = false;
        this.board.busy(false);
        this.board.blockUi(false);
        return mv;
      });
  }


  aiStop(): Promise<void> {
    return this.engine.aiStop()
  }

  undo() {
    const move = this.engine.undo();
    if (!move.invalid) {
      move.effected.filter( p => !!p.block).forEach( p => this.board.move(p) );
    }
  }

  destroy(): void {
    this.engine.destroy();
  }
  
  private doNextMove(): Promise<void> {
    // TODO: Remove check for end game in next version, ChessBoardControlelr should get event on
    // state changed
    if (this.engine.state === GAME_STATE.ACTIVE || this.engine.state === GAME_STATE.CHECK) {
      return this.aiNextMove()
        .then(mv =>
          <any>this.move(this.engine.getPiece(mv.from), this.engine.getBlock(mv.to), mv.promotion));
    } else {
      return Promise.resolve();
    }
  }

  isGameOver(state: GAME_STATE): boolean {
    switch (state) {
      case GAME_STATE.DRAW:
      case GAME_STATE.STALEMATE:
      case GAME_STATE.THREEFOLD_REPETITION:
      case GAME_STATE.INSUFFICIENT_MATERIAL:
      case GAME_STATE.CHECKMATE:
        return true;
      default:
        return false;
    }
  }

  /**
   * Set's the engine's AI level to the level of the current player.
   * @returns {any}
     */
  private setAILevel(): this {
    const value = this.currentPlayer.aiLevel;
    if (isNaN(value) || this.engine.aiLevel === value) return;

    this.engine.aiLevel = value;
    // set the depth according to skill level.
    this.depth = this.engine.aiLevel > 4 ? undefined : this.engine.aiLevel;
    return this;
  }

  private buildQuery(): AIQuery {
    const b = this.black, w = this.white;

    return {
      depth: this.depth,
      // limit: this.limit,
      black: {
        time: (b.time === undefined) ? DEFAULT_TIME : b.time,
        inc: b.inc
      },
      white: {
        time: (w.time === undefined) ? DEFAULT_TIME : w.time,
        inc: w.inc
      }
    };
  }
}
