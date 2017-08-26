import { Stockfish } from 'es6-stockfish';

export abstract class StockfishFactory {
  abstract create(): Promise<Stockfish>;
}