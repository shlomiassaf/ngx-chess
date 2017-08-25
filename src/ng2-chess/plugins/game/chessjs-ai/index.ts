import { ChessEngine } from 'ng2-chess';
import { ChessJSGameAI } from './chessjs-game-ai';

export { ChessJSGameAI } from './chessjs-game-ai';

export const CHESSJS_AI_CHESS_GAME_PROVIDERS = [
  {provide: ChessEngine, useClass: ChessJSGameAI }
];
