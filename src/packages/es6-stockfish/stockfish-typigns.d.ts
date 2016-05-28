declare interface Stockfish {
  postMessage(cmd): void;
  /**
   * The message handler.
   * @param incoming MessageEvent when running under Worker, string if not.
     */
  onmessage: (incoming: string | MessageEvent) => void;
}

declare module STOCKFISH {}

declare function  STOCKFISH(): Stockfish

declare module 'stockfish' {
  export = STOCKFISH;
}

