import { PieceType } from '../models/enums';
import { Block } from '../models/Block';
import { Piece } from '../models/Piece';
import { ChessEngine } from './ChessEngine';
import { ChessBoardController } from './ChessBoardController';

export abstract class ChessBoard {
  /**
   * The controller for this board.
   */
  ctrl: ChessBoardController;
  constructor(CtrlType: typeof ChessBoardController, engine: ChessEngine) {
    Object.defineProperty(this, 'ctrl', { value: new CtrlType(this, engine) });
  }

  abstract highlight(blocks: Block[]);
  abstract newGame(): Promise<void>;
  abstract move(piece: Piece): void;
  abstract askPromotionType(): Promise<PieceType>;
  abstract blockUi(value: boolean): void;
  abstract busy(value: boolean): void;
}
