import { Stockfish } from 'es6-stockfish';

const STOCKFISH_WORKER_FACTORY = require('worker-loader!./stockfish6_worker_wrapper');

function getRegular(resolve: (sf: Stockfish) => void): void {
  (require as any).ensure([], (require: any) => {
    const STOCKFISH = require('exports-loader?STOCKFISH!es6-stockfish/stockfish6');
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
  let resolve, reject;
  const p = new Promise<Stockfish>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  if (webWorker === true) {
    getWebworker(resolve);
  } else {
    getRegular(resolve);
  }
  return p;
}
