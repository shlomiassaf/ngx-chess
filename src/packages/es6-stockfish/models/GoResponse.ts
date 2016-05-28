import { LONG_ALG_NOTATION_RE } from '../util';

/**
 * An object with properties matching the properties in an info line.
 * each property is a function that extracts the value/s for the info property.
 * The function accepts the current index and array and returns:
 * {
 *   jump: how many items to advances in the array
 *   value: the value of the property.
 * }
 *
 * for example:
 * (idx, arr) => {
 *   return {
 *     jump: 2,
 *     value: arr[idx+1]
 *   };
 * }
 * this simple function will returns the next value in the array and jump 2 items (the property + value)
 */
const INFO_MAPPER = (function() {
  // for adjacent key/value in the array
  const simpleNextItem = (index: number, arr: any[]) => {
    return {
      jump: 1,
      value: arr[index + 1]
    }
  };

  // for a continues items in a long algebraic notation move format.
  const movesArrayItems = (index: number, arr: any[]) => {
    const value = [], len = arr.length;
    let idx = index + 1, jump = 0;

    for (idx; idx < len; idx++) {
      if (LONG_ALG_NOTATION_RE.exec(arr[idx])) {
        value.push(arr[idx]);
        jump++;
      } else { break; }
    }

    return { jump, value };
  };

  const mapper: any = {};

  // register all 1 value properties.
  [ 'depth', 'seldepth', 'time', 'nodes', 'multipv', 'currmove', 'currmovenumber', 'hashfull',
    'nps', 'tbhits', 'sbhits', 'cpuload', 'string']
    .reduce( (obj, curr) => {
      obj[curr] = simpleNextItem;
      return obj;
    }, mapper);

  mapper.pv = movesArrayItems;
  mapper.refutation = movesArrayItems;

  mapper.score = (index: number, arr: any[]) => {
    const value: any = {}, len = arr.length;
    let idx = index + 1, jump = 0;

    for (idx; idx < len; idx++) {
      switch (arr[idx]) {
        case 'cp':
        case 'mate':
          value[arr[idx]] = arr[++idx];
          jump +=2;
          break;
        case 'lowerbound':
        case 'upperbound':
          value[arr[idx]] = true;
          jump++;
          break;
        default:
          return { jump, value };
      }
    }
  };

  mapper.currline = (index: number, arr: any[]) => {
    const value: any = {}, len = arr.length;
    let idx = index + 1, jump = 0;

    // cpunr = 1,2,3
    if (! LONG_ALG_NOTATION_RE.exec(arr[idx]) ) {
      value.cpunr = arr[idx].split(',').map( n => Number(n)).filter( n => !isNaN(n));
      jump++;
    }

    // now moves (e2e4, e7e5, e1g1, ...)
    const movesParsed = movesArrayItems(idx + jump, arr);
    jump += movesParsed.jump;
    value.moves = movesParsed.value;

    return { jump, value };
  };

  return mapper;
})();


export class MoveInfo {
  constructor(tokens: string[]) {
    for (let idx = 0, len = tokens.length; idx < len; idx++) {
      let prop = tokens[idx];
      if (prop in INFO_MAPPER) {
        const mappedInfo = INFO_MAPPER[prop](idx, tokens);
        idx += mappedInfo.jump;
        this[prop] = mappedInfo.value;
      }
    }
  }

  /**
   * search depth in plies
   */
  depth: number;

  /**
   * selective search depth in plies, if the engine sends seldepth there must also be a "depth"
   * present in the same string.
   */
  seldepth: number;

  /**
   * the time searched in ms, this should be sent together with the pv.
   */
  time: number;

  /**
   * nodes searched, the engine should send this info regularly
   */
  nodes: number;

  /**
   * the best line found
   */
  pv: string[];

  /**
   * this for the multi pv mode.
   * for the best move/pv add "multipv 1" in the string when you send the pv.
   * in k-best mode always send all k variants in k strings together.
   */
  multipv: number;


  score: {
    /**
     * the score from the engine's point of view in centipawns.
     */
    cp: number;
    /**
     * mate in y moves, not plies.
     * If the engine is getting mated use negative values for y.
     */
    mate: number;
    /**
     *the score is just a lower bound.
     */
    lowerbound: boolean;
    /**
     *the score is just an upper bound.
     */
    upperbound: boolean;
  };

  /**
   * currently searching this move
   */
  currmove: string;

  /**
   * currently searching move number x, for the first move x should be 1 not 0.
   */
  currmovenumber: number;

  /**
   * the hash is x permill full, the engine should send this info regularly
   */
  hashfull: string;

  /**
   * nodes per second searched, the engine should send this info regularly
   */
  nps: number;

  /**
   * positions where found in the endgame table bases
   */
  tbhits: string;

  /**
   * positions where found in the shredder endgame databases
   */
  sbhits: string;

  /**
   * the cpu usage of the engine is x permill.
   */
  cpuload: number;

  /**
   * any string str which will be displayed be the engine,
   * if there is a string command the rest of the line will be interpreted as string
   */
  string: string;

  /**
   * move <move1> is refuted by the line <move2> ... <movei>, i can be any number >= 1.
   * Example: after move d1h5 is searched, the engine can send
   * "info refutation d1h5 g6h5"
   * if g6h5 is the best answer after d1h5 or if g6h5 refutes the move d1h5.
   * if there is no refutation for d1h5 found, the engine should just send
   * "info refutation d1h5"
   * The engine should only send this if the option "UCI_ShowRefutations" is set to true.
   */
  refutation: string[];

  /**
   * this is the current line the engine is calculating.
   * The engine should only send this if the option "UCI_ShowCurrLine" is set to true.
   */
  currline: {
    /**
     * the number of the cpu, the engine might be running on more than one cpu.
     * If only one cpu this value is ommited.
     */
    cpunr: number[];
    moves: string[];
  };
}

export class BestMove {
  constructor(tokens: string[]) {
    this.move = tokens[0];
    if (tokens.length === 3 && tokens[1] === 'ponder') {
      this.ponder = tokens[2]
    }
  }

  move: string;
  ponder: string;
}

export class GoResponse {
  info: MoveInfo[];
  bestMove: BestMove;
}

