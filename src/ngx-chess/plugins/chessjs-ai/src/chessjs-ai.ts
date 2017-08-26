import { ChessEngine } from 'ngx-chess';
import { ChessJSGameAI } from './chessjs-game-ai';

export { ChessJSGameAI } from './chessjs-game-ai';

export { StockfishFactory } from './stockfish-provider';

export const CHESSJS_AI_CHESS_GAME_PROVIDERS = [
  {provide: ChessEngine, useClass: ChessJSGameAI }
];
