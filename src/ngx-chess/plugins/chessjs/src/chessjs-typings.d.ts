declare module Chess {
  export type PieceColor = 'b' | 'w';
  export type PieceType = 'p' | 'k' | 'n' | 'b' | 'q' | 'r';
  /**
   * The flags field in verbose mode may contain one or more of the following values:
   * 'n' - a non-capture
   * 'b' - a pawn push of two squares
   * 'e' - an en passant capture
   * 'c' - a standard capture
   * 'p' - a promotion
   * 'k' - kingside castling
   * 'q' - queenside castling
   *
   * A flag of 'pc' would mean that a pawn captured a piece on the 8th rank and promoted.
   */
  export type MoveFlag = 'n' | 'b' | 'e' | 'c' | 'p' | 'k' | 'q' | 'pc';

  export type SquareColor =  'light' | 'dark';

  export interface Piece {
    type: PieceType;
    color: PieceColor;
  }

  export interface ChessMove {
    color: PieceColor;
    from: string;
    to: string;
    flags: MoveFlag;
    piece: PieceType;
    san: string;
    captured?: PieceType;
    promotion?: PieceType;
  }

  export interface HistoryOptions {
    verbose?: boolean;
  }

  export interface MovesOptions extends HistoryOptions{
    square?: string;
  }

  export interface PGNLoadOptions {
    newline_char?: string;
  }

  export interface PGNExportOptions extends PGNLoadOptions {
    max_width?: number;
  }

  export interface FENValidationResult {
    valid: boolean;
    error_number: number;
    error: string;
  }

  export class Chess {
    BISHOP: 'b';
    BLACK: 'b';
    FLAGS: {
      BIG_PAWN: 'b';
      CAPTURE:'c';
      EP_CAPTURE:'e';
      KSIDE_CASTLE:'k';
      NORMAL:'n';
      PROMOTION:'p';
      QSIDE_CASTLE:'q';
    };
    KING: 'k';
    KNIGHT: 'n';
    PAWN: 'p';
    QUEEN: 'q';
    ROOK: 'r';
    WHITE: 'w';
    SQUARES: string[];

    constructor(fen?: string);

    /**
     * Returns a string containing an ASCII diagram of the current position.
     */
    ascii(): string;
    /**
     * Clears the board.
     */
    clear(): void;

    /**
     * Returns the FEN string for the current position.
     */
    fen(): string;

    /**
     * Returns true if the game has ended via checkmate, stalemate, draw, threefold repetition, or insufficient material. Otherwise, returns false.
     */
    game_over(): boolean;

    /**
     * Returns the piece on the square:
     * @param square
     */
    get(square: string): Chess.Piece;

    /**
     * Returns a list containing the moves of the current game.
     * Options is an optional parameter which may contain a 'verbose' flag.
     * See .moves() for a description of the verbose move fields.
     * @param options
     */
    history(options?: Chess.HistoryOptions): Chess.ChessMove[] | string[];

    /**
     * Returns true or false if the side to move is in check.
     */
    in_check(): boolean;

    /**
     * Returns true or false if the side to move has been checkmated.
     */
    in_checkmate(): boolean;

    /**
     * Returns true or false if the game is drawn (50-move rule or insufficient material).
     */
    in_draw(): boolean;

    /**
     * Returns true or false if the side to move has been stalemated.
     */
    in_stalemate(): boolean;

    /**
     * Returns true or false if the current board position has occurred three or more times.
     */
    in_threefold_repetition(): boolean;

    /**
     * Allows header information to be added to PGN output. Any number of key/value pairs can be passed to .header().
     * Calling .header() without any arguments returns the header information as an object.
     */
    header(...args: string[]): void | any;

    /**
     * Returns true if the game is drawn due to insufficient material (K vs. K, K vs. KB, or K vs. KN); otherwise false.
     */
    insufficient_material(): boolean;

    /**
     * The board is cleared and the FEN string is loaded. Returns true if position was successfully loaded, otherwise false.
     * @param fen
     */
    load(fen: string): void;

    /**
     * Load the moves of a game stored in Portable Game Notation.
     * Options is a optional parameter that contains a 'newline_char' which is a string representation
     * of a RegExp (and should not be pre-escaped) and defaults to '\r?\n').
     * Returns true if the PGN was parsed successfully, otherwise false.
     * @param pgn
     * @param options
     */
    load_pgn(pgn: string, options?: Chess.PGNLoadOptions): boolean;

    /**
     * Attempts to make a move on the board, returning a move object if the move was legal, otherwise null.
     * The .move function can be called two ways, by passing a string in Standard Algebraic Notation (SAN):
     * @param move
     */
    move(move: string): Chess.ChessMove;

    /**
     * Attempts to make a move on the board, returning a move object if the move was legal, otherwise null.
     * The .move function can be called two ways, by passing a string in Standard Algebraic Notation (SAN):
     * @param move
     */
    move(move: { from: string, to: string, promotion?: string }): Chess.ChessMove;

    /**
     * Returns a list of legals moves from the current position.
     * The function takes an optional parameter which controls the single-square move generation and verbosity.
     * @param options
     */
    moves(options?: Chess.MovesOptions): Chess.ChessMove[] | string[];

    /**
     * Returns the game in PGN format.
     * Options is an optional parameter which may include max width and/or a newline character settings.
     * @param options
     */
    pgn(options?: Chess.PGNExportOptions): string;

    /**
     * Place a piece on square where piece is an object with the form { type: ..., color: ... }.
     * Returns true if piece was successfully placed, otherwise the board remains unchanged and false is returned.
     * put() will fail when passed an invalid piece or square, or when two or more kings of the same color are placed.
     */
    put(piece: Chess.Piece, square: string): boolean;

    /**
     * Remove and return the piece on square.
     * @param square
     */
    remove(square: string): Chess.Piece;

    /**
     * Reset the board to the initial starting position.
     */
    reset(): void;

    /**
     * Returns the color of the square ('light' or 'dark').
     * @param square
     */
    square_color(square: string): Chess.SquareColor | void;

    /**
     * Returns the current side to move.
     */
    turn(): Chess.PieceColor;

    /**
     * Takeback the last half-move, returning a move object if successful, otherwise null.
     */
    undo(): Chess.ChessMove;

    /**
     * Returns a validation object specifying validity or the errors found within the FEN string.
     * @param fen
     */
    validate_fen(fen: string): Chess.FENValidationResult;
  }
}

declare module 'chess.js' {
  export = Chess;
}
