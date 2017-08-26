/// <reference path="./chessjs-typings.d.ts" />

import { ChessEngine } from 'ngx-chess';
import { ChessJSGame } from './chessjs-game';

export { util } from './util';

export { ChessJSGame } from './chessjs-game';

export const CHESSJS_CHESS_GAME_PROVIDERS = [
  {provide: ChessEngine, useClass: ChessJSGame }
];
