import { Piece, Block, ChessMove, util as globalUtil } from '../../../../ng2-chess';


export const chessjsUtil = {
  piece: {
    /**
     * Creates a new piece instance from a chess.js Piece object
     * @param block
     * @param csPiece
     */
    factory: (block: Block, csPiece: Chess.Piece): Piece =>
      new Piece(block, globalUtil.piece.from(csPiece.type), globalUtil.color.from(csPiece.color))
  },
  move: {
    /**
     * Creates a new ChessMove instance from a chess.js move object
     * NOTE: Does not populate the effected collection.
     * @param orgMove
     * @returns {ChessMove}
     */
    factory: (orgMove: Chess.ChessMove): ChessMove => {
      const m = new ChessMove();

      if (orgMove === null) {
        m.invalid = true;
      }
      else {
        m.piece = globalUtil.piece.from(orgMove.piece);
        m.color = globalUtil.color.from(orgMove.color);
        m.type = globalUtil.move.from(orgMove.flags);
        m.from = orgMove.from;
        m.to = orgMove.to;

        if (orgMove.captured) {
          m.captured = globalUtil.piece.from(orgMove.captured);
        }

        if (orgMove.promotion) {
          m.promotion = globalUtil.piece.from(orgMove.promotion);
        }
      }
      return m;
    }
  }
};


