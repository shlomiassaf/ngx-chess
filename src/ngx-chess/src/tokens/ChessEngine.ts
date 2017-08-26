import { EventEmitter } from '@angular/core';
import { GAME_STATE, PieceColor, PieceType } from '../models/enums';
import { AIQuery } from '../models/config';
import { ChessMove } from '../models/ChessMove';
import { Block } from '../models/Block';
import { Piece } from '../models/Piece';

export abstract class ChessEngine {
  public blocks: Block[];
  public pieces: Piece[];
  public capturedPieces: Piece[];
  public state: GAME_STATE = GAME_STATE.IDLE;

  public get aiReady(): boolean {
    return false;
  }
  public get aiSupported(): boolean {
    return false;
  }

  // TODO: these should be readonly when TS support readonly modifiers
  public rowCount: number;
  public colCount: number;

  /**
   * True if the game is running.
   * Readonly.
   */
  inGame: boolean;

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

  abstract init(): Promise<void>;

  abstract newGame(): Promise<void>;

  abstract isPromotionMove(piece: Piece, toBlock: Block): boolean;

  abstract move(piece: Piece, toBlock: Block, promotion?: PieceType): ChessMove;

  abstract turn(): PieceColor;

  abstract winner(): PieceColor;
  
  abstract undo(): ChessMove;

  /**
   * Returns a the blocks a piece can move.
   */
  abstract moves(piece: Piece): Block[];

  abstract getBlock(pos: string): Block;
  abstract getPiece(pos: string): Piece;

  /**
   * The AI level of play, from 0 to 20. 0 being the dumbest.
   */
  aiLevel: number;

  aiNextMove(query: AIQuery): Promise<ChessMove> {
    return Promise.reject<ChessMove>(new Error('Not implemented.'));
  }

  /**
   * Stops AI processing and perform the last best move found.
   * @returns {Promise<void>}
   */
  aiStop(): Promise<void> {
    return Promise.resolve();
  }
  
  destroy(): void {
    
  }
}
