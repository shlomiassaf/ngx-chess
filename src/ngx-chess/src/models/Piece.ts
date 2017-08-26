import { PieceType, PieceColor } from './enums';
import { Block,  } from './Block';

export class Piece {
  /**
   * The board block/square hosting this piece.
   * If a piece is captured this property is undefined.
   */
  public block: Block;

  /**
   * The type of the piece (pawn, rook, etc...)
   */
  public type: PieceType;

  /**
   * The color of the piece (WHITE or BLACK).
   * This is a logical color, the UI color is based on the UI implementation and can be any color.
   */
  public color: PieceColor;

  /**
   * If true this piece is captured.
   * When a piece is captured is doesn't have a block.
   */
  public captured: boolean;
  
  constructor(block: Block, type: PieceType, color: PieceColor) {
    this.block = block;
    this.type = type;
    this.color = color;
  }

  /**
   * Mark this piece as captured.
   * Clears the block.
   */
  capture() {
    this.block = undefined;
    this.captured = true;
  }
  
  
}
