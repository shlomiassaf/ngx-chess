import * as ChessJS from 'chess.js';
import { Chess } from 'chess.js';
// 2nd line is a hack to full rollup that will remove the line: import * as ChessJS from 'chess.js';
// unless we add the 2nd line.
import { Injectable, EventEmitter } from '@angular/core';

import {
  Block,
  BaseBlock,
  Piece,
  PieceColor,
  PieceType,
  MoveType,
  ChessMove,
  GAME_STATE,
  ChessEngine
} from 'ngx-chess';

import { util } from './util';


function indexOfByBoard(piece: Piece, pArr: Piece[]): number {
  for (let i = 0, len = pArr.length; i < len; i++) {
    if (piece.block === pArr[i].block) return i;
  }
  return -1;
}

/**
 * A Chess game controller using the chess.js game controller.
 */
@Injectable()
export class ChessJSGame extends ChessEngine {

  public blocks: Block[];
  public pieces: Piece[];

  public capturedPieces: Piece[];
  public state: GAME_STATE = GAME_STATE.IDLE;

  get rowCount(): number {
    return 8;
  }
  get colCount(): number {
    return 8;
  }

  /**
   * True if the game is running.
   * Readonly.
   */
  get inGame(): boolean {
    switch (this.state) {
      case GAME_STATE.ACTIVE:
      case GAME_STATE.CHECK:
        return true;
      default:
        return false;
    }
  }

  /**
   * Fired when the game state has changed, usually after a move.
   * @type {EventEmitter<GAME_STATE>}
     */
  public stateChanged: EventEmitter<GAME_STATE> = new EventEmitter<GAME_STATE>(true);

  /**
   * Fired when the board was synced with the engine, usually after a move.
   * Most moves (a move to an empty block or a simple capture ) will not trigger a board/engine sync
   * however, special moves will (promotions, en passant and casteling)
   * @type {EventEmitter}
     */
  public boardSynced: EventEmitter<void> = new EventEmitter<void>(true);

  protected chess: Chess;

  constructor() {
    super();
    this.initBoard();
  }

  init(): Promise<void> {
    return Promise.resolve();
  }

  newGame(): Promise<void> {
    // we always usee ChessJS and not Chess, see comment on the top.
    this.chess = ChessJS ? new (<any>ChessJS)() : new Chess();
    this.pieces = this.createPieces();
    this.capturedPieces = [];
    this.changeState(GAME_STATE.ACTIVE);
    this.boardSynced.emit(null);
    return Promise.resolve();
  }

  isPromotionMove(piece: Piece, toBlock: Block): boolean {
    if (piece.type === PieceType.PAWN) {
      // TODO: row/col are inverted for some reason... fix and change here to row.
      if (piece.color === PieceColor.BLACK && toBlock.col === this.rowCount - 1) {
        return true;
      }
      if (piece.color === PieceColor.WHITE && toBlock.col === 0) {
        return true;
      }
    }
    return false;
  }

  move(piece: Piece, toBlock: Block, promotion?: PieceType): ChessMove {

    if (this.state !== GAME_STATE.ACTIVE && this.state !== GAME_STATE.CHECK) {
      return null;
    }

    const move = util.move.factory(this.chess.move({
      from: piece.block.pos,
      to: toBlock.pos,
      promotion: util.piece.to(promotion)
    }));

    // if it was a kill, remove the piece from the board.
    if (!move.invalid) {
      move.effected = this.updateMove(move, piece, toBlock);
      this.checkState();
    }

    return move;
  }

  undo(): ChessMove {
    if (this.state !== GAME_STATE.ACTIVE && this.state !== GAME_STATE.CHECK) {
      return util.move.factory(null);
    }

    const move = util.move.factory(this.chess.undo());

    if (!move.invalid) {
      const piece = this.getPiece(move.to),
            toBlock = this.getBlock(move.from);

      // move.from = move.to;
      // move.to = toBlock.pos;

      move.effected = this.updateMove(move, piece, toBlock, true);
      this.checkState();
    }

    return move;
  }


  turn(): PieceColor {
    return util.color.from(this.chess.turn());
  }

  winner(): PieceColor {
    if (this.state === GAME_STATE.CHECKMATE) {
      return this.turn() === PieceColor.BLACK ? PieceColor.WHITE : PieceColor.BLACK;
    } else {
      return PieceColor.UNKNOWN;
    }
  }

  /**
   * Query a block/square on the board and returns the piece on it.
   * Returns null if block is empty.
   * @param pos
   * @returns {Piece}
   */
  getBlock(pos: string): Block {
    return this.blocks[ BaseBlock.posToIndex(pos, this.rowCount) ];
  }

  /**
   * Query a block/square on the board and returns the piece on it.
   * Returns null if block is empty.
   * @param pos
   * @returns {Piece}
     */
  getPiece(pos: string): Piece {
    // TODO: Maybe hold a hash for direct access?
    // this will also speed up other operations in updateBpoard() and syncBoard()
    // consider that there are max of 32 items in the array, not sure worth the trade off.
    for (let i = 0, len = this.pieces.length; i < len; i++) {
      if (this.pieces[i].block.pos === pos) {
        return this.pieces[i];
      }
    }
  }

  /**
   * Get block piece index.
   * Return the index of a piece on a specific block/square, if a piece occupiy the block.
   * @param { Block | string } blockOrPosition A Block instance or a position in file/rank format (e8)
   * @returns { number } The index of the piece in the pieces array or -1 if not found.
   */
  getBPI(blockOrPosition: Block| string): number {
    if (typeof blockOrPosition !== 'string') {
      blockOrPosition = (blockOrPosition as Block).pos;
    }

    for (let i = 0, len = this.pieces.length; i < len; i++) {
      if (this.pieces[i].block.pos === blockOrPosition as string) {
        return i;
      }
    }
    return -1;
  }

  moves(piece: Piece): Block[] {
    return (this.chess.moves({square: piece.block.pos}) as string[])
      .map(move => this.blocks[BaseBlock.sanToIndex(move, piece.block.pos)]);
  }

  /**
   * Preforms a sync between the chess engine and the current piece collection so the
   * piece collection will represent the actual board state.
   * This call does not change the pieces array, it just modify it (i.e: reference is the same)
   * This call is not used but since every move is updated per changes, but its here if needed.
   */
  public syncBoard() {
    // generate a new piece collection representing the current board state.
    // We want to avoid a redraw of all of the pieces so we will work on the existing collection
    // and update it, this will minimize DOM operations as most pieces are the same.

    // For every block on the board we have 5 options
    // 1) Didn't Have a piece and still doesn't (nothing changed)
    // 2) Had a piece and it didn't change. (nothing changed)
    // 3) Had a piece but now it doesn't.
    // 4) Had a piece but now the color and/or type had changed.
    // 5) Didn't Have a piece but now it does.

    // Since a piece refer to a block, we will create a collection of pieces representing
    // the new state, #1 is automatically resolved this way
    const pieces = this.createPieces();

    for (let i = 0, len = this.pieces.length; i < len; i++) {
      const idx = indexOfByBoard(this.pieces[i], pieces);

      if (idx === -1) { // #3 this piece is on a block no longer occupied, remove it.
        // TODO: some removed pieces are capture and should be stored in the captured collection
        // some just moved to a new location so we need to handle that.
        this.pieces.splice(i, 1);
        len--;
        i--;
      } else { // #2&4 found a matching block, match piece (event is its the same, who cares)
        let newPiece = pieces.splice(idx, 1)[0]; // remove to have only "new" locations left
        this.pieces[i].color = newPiece.color;
        this.pieces[i].type = newPiece.type;
      }
    }

    // now our new piece collection holds only pieces moved to new blocks, blocks that were
    // empty before, we will handle that.
    this.pieces.splice(this.pieces.length, 0, ...pieces);
    this.boardSynced.emit(null);
  }

  destroy(): void {
    super.destroy();
    this.stateChanged.complete();
    this.boardSynced.complete();
  }

  /**
   * Update the board after a move so pieces reflect the new state of the board.
   * @param move
   * @param piece
   * @param newBlock
   * @returns A collection of all pieces effected by this move.
     */
  private updateMove(move: ChessMove, piece: Piece, newBlock: Block, revert: boolean = false): Piece[] {
    const effected: Piece[] = [piece];

    if (move.isPromotionMove()) {
      piece.type = revert ? move.piece : move.promotion;
    }

    if (move.isCaptureMove()) {
      // Handling captures: Standard capture, Promotion capture or en passant.
      // we point to the index (block array) of the block to remove the piece on, newBlock by default.
      // The only case where default is invalid is when an En Passant happen since the captured
      // piece is not on the block the acting piece landed on, in such case we will add the offset
      // to the index so we will point to the right kill block.
      if (revert) {
        const p = this.capturedPieces.pop();
        this.pieces.push(p);
        p.block = piece.block;
        p.captured = false;
        effected.push(p);
      } else {
        let killIndex = newBlock.index;
        if (move.type === MoveType.EnPassant) {
          // TODO: row/col are inverted for some reason... fix and change here to row.
          killIndex += (newBlock.col > piece.block.col ? -1 : 1);
        }
        const p = this.getPiece(this.blocks[killIndex].pos);
        p.capture();
        this.pieces.splice(this.pieces.indexOf(p), 1);
        this.capturedPieces.push(p);
        effected.push(p);
      }
    }

    // can be else if...
    if (move.isCastlingMove()) {
      // in castling we have to also take into consideration the Rook which moves next to the king.
      // king side castling: kings lands 1 block from the rook and we need to move it to the other side
      // queen side castling: kings lands 2 blocks from the rook and we need to move it to the other next.
      if (revert) {
        let matrix = piece.block.row > newBlock.row ? [1, -1] : [-2, 1],
          rookSrcIndex = piece.block.index + this.rowCount * matrix[0],
          rookDstIndex = piece.block.index + this.rowCount * matrix[1];

        const p = this.getPiece(this.blocks[rookDstIndex].pos);
        p.block = this.blocks[rookSrcIndex];
        effected.push(p);
      }
      else {
        let matrix = newBlock.row > piece.block.row ? [1, -1] : [-2, 1],
          rookSrcIndex = newBlock.index + this.rowCount * matrix[0],
          rookDstIndex = newBlock.index + this.rowCount * matrix[1];

        // find the rook piece and set it's block to our "after castling" block.
        const p = this.getPiece(this.blocks[rookSrcIndex].pos);
        p.block = this.blocks[rookDstIndex];
        effected.push(p);
      }
    }

    // in any case, our acting piece should now reflect the block it moved to.
    piece.block = newBlock;
    return effected;
  }

  private checkState() {
    if (this.chess.game_over()) {
      if (this.chess.in_checkmate()) {
        this.changeState(GAME_STATE.CHECKMATE);
      } else if (this.chess.in_draw()) {
        this.changeState(GAME_STATE.DRAW);
      } else if (this.chess.in_stalemate()) {
        this.changeState(GAME_STATE.STALEMATE);
      } else if (this.chess.in_threefold_repetition()) {
        this.changeState(GAME_STATE.THREEFOLD_REPETITION);
      } else if (this.chess.insufficient_material()) {
        this.changeState(GAME_STATE.INSUFFICIENT_MATERIAL);
      } else {
        throw new Error('Unknown game state');  // TODO: What to do?
      }
    } else if (this.chess.in_check()) {
      this.changeState(GAME_STATE.CHECK);
    } else if (this.state === GAME_STATE.CHECK) {
      this.changeState(GAME_STATE.ACTIVE);
    }
  }

  private changeState(newState: GAME_STATE): void {
    if (this.state === newState) return;
    this.state = newState;
    this.stateChanged.emit(newState);
  }

  private initBoard(): void {
    this.pieces = undefined;
    this.capturedPieces = undefined;
    this.blocks = this.createBlocks();
  }

  private createBlocks(): Block[] {
    const ChessBlock = BaseBlock.factory({
      rowCount: this.rowCount,
      colCount: this.colCount
    });

    const blocks: Block[] = [];
    for (let i = 0, len = this.rowCount * this.colCount; i < len; i++) {
      blocks.push(new ChessBlock(i));
    }
    return blocks;
  }

  private createPieces(): Piece[] {
    const pieces = [];

    this.blocks.forEach( block => {
      let csPiece: Chess.Piece;
      if (csPiece = this.chess.get(block.pos)) {
        pieces.push(util.piece.factory(block, csPiece));
      }
    });

    return pieces;
  }

}
