import { Stockfish } from 'es6-stockfish';

const STOCKFISH_FACTORY = require('exports-loader?STOCKFISH!es6-stockfish/stockfish6');
let stockfish: Stockfish;

declare var onmessage: (event: MessageEvent) => any;

postMessage("WORKER_LOADED", undefined);

stockfish = STOCKFISH_FACTORY();
onmessage = (event: MessageEvent): any => stockfish.postMessage(event.data);
stockfish.onmessage = (incoming: string | MessageEvent) => postMessage(incoming, undefined);

