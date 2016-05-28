import { Block, Piece, PieceColor, PieceType, ChessMove, PlayerType,
         AIQuery, PlayerSettings } from '../index';

import { ChessEngine } from './ChessEngine';
import { ChessBoard } from './ChessBoard';

const DEFAULT_TIME = 144000; // 2.4 mins


export class ChessBoardController {
  constructor(protected board: ChessBoard, protected engine: ChessEngine) {}


  get white(): PlayerSettings {
    return this.players[PieceColor.WHITE];
  };

  get black(): PlayerSettings {
    return this.players[PieceColor.BLACK];
  };

  get currentPlayer(): PlayerSettings {
    return this.players[this.engine.turn()];
  }

  get aiSupported(): boolean {
    return this.engine.aiSupported;
  }

  private depth: number;

  // the enum is the index;
  private players: PlayerSettings[] = [null, new PlayerSettings(), new PlayerSettings()];

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
    return this.board.newGame();
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
      this.board.move(piece, toBlock);
    }

    isAI = this.currentPlayer.player === PlayerType.AI;

    // if it's computer turn, make him move.
    if (this.engine.aiReady && isAI) {
      this.setAILevel();
      setTimeout(() => this.doNextMove() , 0);
    }

    return Promise.resolve(move);
  }

  aiNextMove(): Promise<ChessMove> {
    return this.engine.aiNextMove(this.buildQuery());
  }

  private doNextMove(): Promise<void> {
    this.board.blockUi(true);
    this.board.busy(true);

    return this.aiNextMove()
      .then(mv => this.move(this.engine.getPiece(mv.from), this.engine.getBlock(mv.to), mv.promotion))
      .then( () => { // TODO: Enabled on error as well?
        this.board.busy(false);
        this.board.blockUi(false);
      });
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
