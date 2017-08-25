export enum GAME_STATE {
  IDLE,
  ACTIVE,
  CHECK,
  CHECKMATE,
  DRAW,
  STALEMATE,
  THREEFOLD_REPETITION,
  INSUFFICIENT_MATERIAL
}

export enum PieceType {
  /**
   * Used for invalid mapping operations with 3rd party libraries
   */
  UNKNOWN = 0,
  PAWN = 1,
  BISHOP = 2,
  KNIGHT = 3,
  ROOK = 4,
  QUEEN = 5,
  KING = 6
}

export enum PieceColor {
  /**
   * Used for invalid mapping operations with 3rd party libraries
   */
  UNKNOWN = 0,
  BLACK = 1,
  WHITE = 2
}

export enum MoveType {
  /**
   * Used for invalid mapping operations with 3rd party libraries
   */
  UNKNOWN,

  /**
   * A regular move of a piece to an empty block/square.
   */
  Regular,
  /**
   * A pawn push of two squares
   */
  PawnMoveTwo,
  /**
   * A standard capture
   */
  Capture,
  /**
   * An capture by en passant
   */
  EnPassant,
  /**
   * A Promotion
   */
  Promotion,
  /**
   * A Promotion the involved a captured piece
   */
  PromotionWithCapture,
  /**
   * Castling to the side of the king
   */
  KingSideCastling,
  /**
   * Castling to the side of the queen
   */
  QueenSideCastling
}

export enum PlayerType {
  HUMAN,
  AI
}
