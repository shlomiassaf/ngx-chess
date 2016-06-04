import { PieceColor, PieceType, MoveType, ChessMove } from '../ng2-chess';
const LONG_ALG_NOTATION_RE = /^([a-h]\d)([a-h]\d)([qkbn]?)$/;

const color = {
  /**
   * Map's a string color type(w, b) to a PieceColor
   * @param {string} color
   * @returns {PieceColor}
   */
  from: (color: string): PieceColor => {
    switch (color) {
      case 'w':
        return PieceColor.WHITE;
      case 'b':
        return PieceColor.BLACK;
      default:
        return PieceColor.UNKNOWN;
    }
  },
  /**
   * Map's a PieceColor to a string color type (w, b)
   * @param {PieceColor} color
   * @returns {string}
   */
  to: (color: PieceColor): string => {
    switch (color) {
      case PieceColor.WHITE:
        return 'w';
      case PieceColor.BLACK:
        return 'b';
      default:
        return null;
    }
  }
};


const piece = {
  /**
   * Map's a string piece type(p, b, n, r, q, k) to a PieceType
   * @param {string} type
   * @returns {PieceType}
   */
  from: (type: string): PieceType => {
    switch (type) {
      case 'p':
        return PieceType.PAWN;
      case 'b':
        return PieceType.BISHOP;
      case 'n':
        return PieceType.KNIGHT;
      case 'r':
        return PieceType.ROOK;
      case 'q':
        return PieceType.QUEEN;
      case 'k':
        return PieceType.KING;
      default:
        return PieceType.UNKNOWN;
    }
  },
  /**
   * Map's a PieceType to a string piece type(p, b, n, r, q, k)
   * @param {PieceType} type
   * @returns {string}
   */
  to: (type: PieceType): string => {
    switch (type) {
      case PieceType.PAWN:
        return 'p';
      case PieceType.BISHOP:
        return 'b';
      case PieceType.KNIGHT:
        return 'n';
      case PieceType.ROOK:
        return 'r';
      case PieceType.QUEEN:
        return 'q';
      case PieceType.KING:
        return 'k';
      default:
        return null;
    }
  }
};

const move = {
  /**
   * Map's a chess.js move type(n, b, e, c, p, k, q) to a MoveType
   * @param {string} type
   * @returns {PieceType}
   */
  from: (type: string): MoveType => {
    switch (type) {
      case 'np':
      case 'pn':
        return MoveType.Promotion;
      case 'n':
        return MoveType.Regular;
      case 'b':
        return MoveType.PawnMoveTwo;
      case 'e':
        return MoveType.EnPassant;
      case 'c':
        return MoveType.Capture;
      case 'k':
        return MoveType.KingSideCastling;
      case 'q':
        return MoveType.QueenSideCastling;
      case 'cp':
      case 'pc':
        return MoveType.PromotionWithCapture;
      default:
        return MoveType.UNKNOWN;
    }
  },
  /**
   * Map's a MoveType to a chess.js move type(n, b, e, c, p, k, q)
   * @param {PieceType} type
   * @returns {string}
   */
  to: (type: MoveType): string => {
    switch (type) {
      case MoveType.Regular:
        return 'n';
      case MoveType.PawnMoveTwo:
        return 'b';
      case MoveType.EnPassant:
        return 'e';
      case MoveType.Capture:
        return 'c';
      case MoveType.Promotion:
        return 'p';
      case MoveType.KingSideCastling:
        return 'k';
      case MoveType.QueenSideCastling:
        return 'q';
      case MoveType.PromotionWithCapture:
        return 'cp';
      default:
        return null;
    }
  },
  fromLongAlgebraic: (notation: string): ChessMove => {
    const chessMove = new ChessMove();
    let move = LONG_ALG_NOTATION_RE.exec(notation);

    if (move) {
      chessMove.from = move[1];
      chessMove.to = move[2];
      if (move.length === 4) {
        chessMove.promotion = util.piece.from(move[3])
      }
    }
    else {
      throw new Error('Invalid Long Algebraic Notation instruction ' + notation);
    }

    return chessMove;
  },

  toLongAlgebraic(chessMove: ChessMove): string {
    return chessMove.from + chessMove.to + (piece.to(chessMove.promotion) || '');
  }
};

export const util = {
  piece,
  move,
  color
};
