import { PromiseCompleter } from './util';
const STOCKFISH_WORKER_FACTORY = require('worker!./lib/stockfish6_worker_wrapper');

function getRegular(resolve: (sf: Stockfish) => void): void {
  require.ensure([], (require: any) => {
    const STOCKFISH = require('exports?STOCKFISH!./lib/stockfish6');
    resolve(STOCKFISH());
  });
}

function getWebworker(resolve: (sf: Stockfish) => void): void {
  let stockfish: Stockfish = new STOCKFISH_WORKER_FACTORY();

  // Listen to the first message, the 'stockfish6_worker_wrapper' will emit a message once loaded
  // before initializing stockfish, this means that the resource was loaded, something like onload.
  stockfish.onmessage = () => {
    stockfish.onmessage = undefined;
    resolve(stockfish);
    stockfish = undefined;
  };
}


/**
 * A promise factory for new stockfish instances.
 * @param webWorker If true the stockfish instance runs on a web worker thread.
 *
 * @returns {Promise<Stockfish>}
 */
export function getStockfish(webWorker: boolean): Promise<Stockfish> {
  const pCompleter = new PromiseCompleter<Stockfish>();

  if (webWorker === true) {
    getWebworker(pCompleter.resolve);
  } else {
    getRegular(pCompleter.resolve);
  }
  return pCompleter.promise;
}
