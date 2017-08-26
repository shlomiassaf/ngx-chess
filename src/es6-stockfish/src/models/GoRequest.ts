import { GoResponse } from './GoResponse';

export class GoRequest {
  /**
   * restrict search to this moves only
   * Example: After "position startpos" and "go infinite searchmoves e2e4 d2d4"
   * the engine should only search the two moves e2e4 and d2d4 in the initial position.
   */
  searchmoves: string[];

  /**
   * start searching in pondering mode.
   * Do not exit the search in ponder mode, even if it's mate!
   * This means that the last move sent in in the position string is the ponder move.
   * The engine can do what it wants to do, but after a "ponderhit" command
   * it should execute the suggested move to ponder on. This means that the ponder move sent by
   * the GUI can be interpreted as a recommendation about which move to ponder. However, if the
   * engine decides to ponder on a different move, it should not display any mainlines as they are
   * likely to be misinterpreted by the GUI because the GUI expects the engine to ponder
   * on the suggested move.
   */
  ponder: boolean;

  /**
   * white has x msec left on the clock
   */
  wtime: number;

  /**
   * black has x msec left on the clock
   */
  btime: number;

  /**
   * white increment per move in mseconds if x > 0
   */
  winc: number;

  /**
   * black increment per move in mseconds if x > 0
   */
  binc: number;

  /**
   * there are x moves to the next time control, this will only be sent if x > 0,
   * if you don't get this and get the wtime and btime it's sudden death
   */
  movestogo: number;

  /**
   * search x plies only
   */
  depth: number;

  /**
   * search x nodes only
   */
  nodes: number;
  /**
   * search for a mate in x moves
   */
  mate: number;
  /**
   * search exactly x mseconds
   */
  movetime: number;

  /**
   * search until the "stop" command. Do not exit the search without being told so in this mode!
   */
  infinite: boolean;

  $request(): string {
    const arr = ['go'];
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        let val = this[key];
        // only set non undefined values.
        if (val !== undefined) {
          arr.push(key);
          if (Array.isArray(val)) {
            val = <any>val.join(' ');
          }
          arr.push(<any>val);
        }
      }
    }
    return arr.join(' ');
  }
}

export class GoRequestFactory {
  $$: GoRequest = new GoRequest();

  constructor(go: (request: GoRequest) => Promise<GoResponse>) {
    if (typeof go === 'function') {
      this.$post = () => go(this.$requestObject())
    }

  }

  $post(): Promise<GoResponse> {
    throw new Error('Not Implemented');
  }

  $requestObject(): GoRequest {
    return this.$$;
  }

  $request(): string {
    return this.$$.$request();
  }

  searchmoves(...args: string[]): this {
    this.$$.searchmoves = args;
    return this;
  }

  ponder(value: boolean): this {
    if (value) {
      this.$$.ponder = true;
    }
    else {
      delete this.$$['ponder'];
    }
    return this
  }

  /**
   * white has x msec left on the clock
   */
  wtime(x: number): this {
    this.$$.wtime = x;
    return this;
  }

  /**
   * black has x msec left on the clock
   */
  btime(x: number): this {
    this.$$.btime = x;
    return this;
  }

  /**
   * white increment per move in mseconds if x > 0
   */
  winc(x: number): this {
    this.$$.winc = x;
    return this;
  }


  /**
   * black increment per move in mseconds if x > 0
   */
  binc(x: number): this {
    this.$$.binc = x;
    return this;
  }

  /**
   * there are x moves to the next time control, this will only be sent if x > 0,
   * if you don't get this and get the wtime and btime it's sudden death
   */
  movestogo(x: number): this {
    this.$$.movestogo = x;
    return this;
  }

  /**
   * search x plies only
   */
  depth(x: number): this {
    this.$$.depth = x;
    return this;
  }

  /**
   * search x nodes only
   */
  nodes(x: number): this {
    this.$$.nodes = x;
    return this;
  }

  /**
   * search for a mate in x moves
   */
  mate(x: number): this {
    this.$$.mate = x;
    return this;
  }

  /**
   * search exactly x mseconds
   */
  movetime(x: number): this {
    this.$$.movetime = x;
    return this;
  }

  /**
   * search until the "stop" command. Do not exit the search without being told so in this mode!
   */
  infinite(value: boolean): this {
    if (value) {
      this.$$.infinite = true;
    }
    else {
      delete this.$$['infinite'];
    }
    return this
  }
}
