// Chess
import 'chess.js';


import { ChessEngine } from 'ng2-chess';
import { ChessJSGame } from './chessjs-game';

export { util } from './util';

export { ChessJSGame } from './chessjs-game';

export const CHESSJS_CHESS_GAME_PROVIDERS = [
  {provide: ChessEngine, useClass: ChessJSGame }
];
