import { PromisedUCIQueue, PromisedUCIQueueItem } from './PromisedUCIQueue';
import { UCICommandRouter } from './CommandHandler';
import { GoRequest, GoRequestFactory } from './models/GoRequest';
import { GoResponse, BestMove, MoveInfo } from './models/GoResponse';
import { OptionRequest, OptionRequestFactory } from './models/OptionRequest';
import { OptionResponse } from './models/OptionResponse';
import { FishwrapMeta } from './models/FishwrapMeta';
import { UCI_MSG_IN, UCI_MSG_OUT, POSITION_SET_TYPE, OPTION_NAME } from './enums';

import { flatMessage, enumAsStr } from './util';

export interface Stockfish {
  postMessage(cmd: string | number | boolean): void;
  /**
   * The message handler.
   * @param incoming MessageEvent when running under Worker, string if not.
   */
  onmessage: (incoming: string | MessageEvent) => void;
}

/**
 * A modern JS wrapper around the StockfishJS chess engine.
 */
export class FishWrap extends UCICommandRouter {
  meta: FishwrapMeta;
  isInit: boolean = false;

  protected sf: Stockfish & { terminate?: () => void };
  protected que: PromisedUCIQueue = new PromisedUCIQueue();

  /**
   *
   * @param stockfishFactory A Factory that returns a Promise for a stockfish instance.
   * you can return stockfish running in a webworker or just running on the local thread.
   * @param debug
     */
  constructor(private stockfishFactory: () => Promise<Stockfish>, debug?: boolean) {
    super();
    if (debug === true) this.__debug__ = true;
  }

  uci(): Promise<void> {
    const ok = UCI_MSG_IN.uciok;

    if (this.isInit) {
      return Promise.resolve();
    }
    else if (this.que.exists(ok)) {
      return this.que.find<void>(ok).promise;
    }
    else {
      return this.init()
        .then( () => {
          this.post(enumAsStr(UCI_MSG_OUT, UCI_MSG_OUT.uci));
          return this.que.add(new PromisedUCIQueueItem<void>(ok)).promise
            .then(() => {
              this.isInit = true;
              return;
            });
        });
    }
  }

  /**
   * Send isready to the engine.
   * A following call to isready() while an isready() is already in flight WILL NOT trigger a new
   * isready() request, it will return the promise for the currently pending request.
   * @returns {Promise<void>}
     */
  isready(): Promise<void> {
    const ok = UCI_MSG_IN.readyok;
    const queItem = this.que.find<void>(ok) || this.que.add(new PromisedUCIQueueItem<void>(ok));

    return this.uci().then( () => {
        this.post(enumAsStr(UCI_MSG_OUT, UCI_MSG_OUT.isready));
        return queItem.promise;
    });
  }

  /**
   * Send ucinewgame to the engine.
   * A following call to ucinewgame() while an ucinewgame() is already in flight WILL trigger a new
   * ucinewgame() request.
   * @returns {Promise<void>}
   */
  ucinewgame(): Promise<void> {
    const ok = UCI_MSG_IN.readyok;
    let queItem;

    if (!this.isInit) {
      return this.isready().then( () => this.ucinewgame() );
    } else if (queItem = this.que.find(ok)) {
      return queItem.promise.then( () => this.ucinewgame() );
    } else {
      this.post(enumAsStr(UCI_MSG_OUT, UCI_MSG_OUT.ucinewgame));
      return this.isready();
    }
  }

  /**
   * Set position on the board's engine.
   * This message has no response.
   * @param type FEN or start position with optional long algebraic notation moves.
   * @param fenOrMoves a FEN string or space delimited moves in long algebraic notation (g1f3 g8f6)
   * @returns {FishWrap}
     */
  position(type: POSITION_SET_TYPE, fenOrMoves?: string): this {
    let cmd = [
      enumAsStr(UCI_MSG_OUT, UCI_MSG_OUT.position),
      enumAsStr(POSITION_SET_TYPE, type)
    ]; // ["position", "fen", ...] or ["position", "startpos", ...]

    if (type === POSITION_SET_TYPE.fen && !fenOrMoves) {
      throw new Error('FEN positioning requires a FEN string');
    } else if (type === POSITION_SET_TYPE.startpos && fenOrMoves) {
      cmd.push('moves');
    }

    fenOrMoves && cmd.push(fenOrMoves);

    this.post(cmd.join(' '));

    return this;
  }

  /**
   * Set an engine option
   * This message has no response.
   * @param request The object representing the request or the option name.
 *                  When setting OPTION_NAME be sure to include the value
   * @param value Used when request is OPTION_NAME.
   * @returns {FishWrap}
   */
  setoption(request: OptionRequest | OPTION_NAME, value?: any): this {
    if (typeof request === 'number') {
      return this.setoption(OptionRequest.create(request, value));
    }
    else {
      this.post( (request as OptionRequest).$request() );
      this.meta.option[ (request as OptionRequest).propName ].value = (request as OptionRequest).value;
    }
    return this;
  }

  setoptionDyn(): OptionRequestFactory {
    return new OptionRequestFactory( (request: OptionRequest) => this.setoption(request) );
  }

  go(request?: GoRequest | string, saveInfo?: boolean): Promise<GoResponse> {
    if(typeof request === 'boolean') {
      saveInfo = <any>request;
      request = undefined;
    }
    request = request ? request : new GoRequest();

    const ok = UCI_MSG_IN.bestmove;
    if (this.que.exists(ok)) {
      return <any>Promise.reject(new Error('Engine is already processing a go instruction.'));
    }

    return this.isready().then( () => {
      const queItem = new PromisedUCIQueueItem<GoResponse>(ok);
      queItem.data = saveInfo === true ? [] : undefined; // for info messages
      this.que.add(queItem);

      this.post(typeof request === 'string' ? request : request.$request());

      return queItem.promise;
    });
  }

  /**
   * Returns a GoRequestFactory with an additional go() function that when called invoked a go()
   * request with the GoRequest created by the GoRequestFactory.
   * This is just a fluent helper for creating go requests.
   * Exapmle:
   * const p = fishWrapper.goDyn(true)..wtime(144000).btime(144000).go();
   * // p is a Promise for GoResponse
   * @param saveInfo
   * @returns {GoRequest&{go: (function(): Promise<GoResponse>)}}
     */
  goDyn(saveInfo?: boolean): GoRequestFactory {
    return new GoRequestFactory( (request: GoRequest) => this.go(request.$request(), saveInfo) );
  }

  stop(): Promise<void> {
    const ok = UCI_MSG_IN.readyok;
    const queItem = this.que.find(ok) || this.que.find(UCI_MSG_IN.bestmove);

    if (queItem && queItem.cmd === ok) {
      return queItem.promise.then( () => <any>this.stop() );
    } else {
      this.post(enumAsStr(UCI_MSG_OUT, UCI_MSG_OUT.stop));
      return queItem ? <any>queItem.promise : this.isready();
    }
  }

  destroy(): void {
    this.isInit = false;
    this.meta = undefined;
    if (this.sf) {
      if (typeof this.sf.terminate === 'function') {
        this.sf.terminate();  
      }
      
      this.sf.onmessage = undefined;
      this.sf = undefined;
    }
  }

  protected init(): Promise<void> {
    this.meta = new FishwrapMeta();
    return this.stockfishFactory()
      .then( (stockfish: Stockfish) => {
        this.sf = stockfish;
        this.createStream();
      });
  }

  private post(msg: string): void {
    if (this.__debug__) console.log(msg);
    this.sf.postMessage(msg)
  }

  protected createStream() {
    this.sf.onmessage = (incoming: string | MessageEvent) => {
      let msg = flatMessage(incoming);
      msg && this.route(msg);
    };
  }

  private bestmoveHandler(cmd: UCI_MSG_IN, tokens: string[]) {
    const queItem = this.que.find<any>(UCI_MSG_IN.bestmove),
          goResponse = new GoResponse();

    goResponse.bestMove = new BestMove(tokens);
    goResponse.info = Array.isArray(queItem.data) ? queItem.data : [];

    this.que.resolve(cmd, goResponse);
  }

  private idHandler(cmd: UCI_MSG_IN, tokens: string[]) {
    if (tokens.length) {
      this.meta.id[tokens.shift()] = tokens.join(' ');
    }
  }

  private optionHandler(cmd: UCI_MSG_IN, tokens: string[]) {
    const option = new OptionResponse(tokens);

    if (OPTION_NAME[option.propName] === undefined) {
      console.warn('Unrecognized option name: ' + option.propName);
    }
    this.meta.option[option.propName] = option;
  }

  protected defaultHandler(cmd: UCI_MSG_IN, tokens: string[]) {
    switch (cmd) {
      case UCI_MSG_IN.uciok:
      case UCI_MSG_IN.readyok:
        this.que.resolve(cmd);
        break;
      case UCI_MSG_IN.info: // info is multi line, we know it ends in the bestmove handler.
        const queItem = this.que.find<any>(UCI_MSG_IN.bestmove);
        queItem && queItem.data && queItem.data.push(new MoveInfo(tokens));
        break;
    }
  }

  protected unknownHandler(cmd: any, tokens: string[]) {
    if (this.__debug__) {
      console.log(`UNKNOWN HANDLER -> [${cmd}]: ${tokens.join(' ')}`);
    }
  }
}
