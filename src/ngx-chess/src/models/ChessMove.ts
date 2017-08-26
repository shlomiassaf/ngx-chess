import { MoveType, PieceColor, PieceType } from './enums';
import { Piece,  } from './Piece';

export class ChessMove {
  piece: PieceType;
  color: PieceColor;
  type: MoveType;
  from: string;
  to: string;
  captured: PieceType = PieceType.UNKNOWN;
  promotion: PieceType = PieceType.UNKNOWN;
  /**
   * If true, the move is invalid, all other properties might be empty.
   */
  invalid: boolean;

  /**
   * This pieces effected by this move, i.e pieces that their block/type changed or were captured.
   */
  effected: Piece[];

  /**
   * Returns true if the move involved a capture.
   * This can be Standard capture, Promotion capture or En passant.
   * @returns {boolean}
   */
  isCaptureMove(): boolean {
    switch (this.type) {
      case MoveType.Capture:
      case MoveType.PromotionWithCapture:
      case MoveType.EnPassant:
        return true;
    }
    return false;
  }

  /**
   * Returns true if the move involved a Promotion.
   * This can be Promotion, or a Promotion with capture.
   * @returns {boolean}
   */
  isPromotionMove(): boolean {
    switch (this.type) {
      case MoveType.Promotion:
      case MoveType.PromotionWithCapture:
        return true;
    }
    return false;
  }

  /**
   * Returns true if the move involved castling.
   * This can be QueenSideCastling, or a KingSideCastling.
   * @returns {boolean}
   */
  isCastlingMove(): boolean {
    switch (this.type) {
      case MoveType.QueenSideCastling:
      case MoveType.KingSideCastling:
        return true;
    }
    return false;
  }
}
