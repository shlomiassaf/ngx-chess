import { UCI_MSG_IN } from './enums';
import { PromiseCompleter } from './util';

export class PromisedUCIQueueError extends Error {
  constructor(value: string) {
    super(value);
  }
}

/**
 * A PromiseCompleter of promised incoming UCI messages.
 * Each "promised" items relates to a specific incoming UCI message that should come at a later time.
 * The completer holds a refetence to the promise and to its resolvers (resolve/reject)
 * It also holds an arbitrary data object used for storing data across multiple incomings, i.e when
 * an item needs to holds data between several incoming messages. A good example is Stockfish's "info"
 * messages that are aggrgated until a "bestmove" message arrives.
 */
export class PromisedUCIQueueItem<T> extends PromiseCompleter<T> {
  /**
   * Arbitrary object to hold data between multi-line operations.
   */
  data: any;
  constructor(public cmd: UCI_MSG_IN) {
    super();
  }
}

/**
 * A collection of promised UCI messages, messages that should resolve in the future.
 * The collection can store unique UCI message types, identified by UCI_MSG_IN.
 * This means that it can only except one PromiseCompleter for each UCI_MSG_IN. This makes sense
 * because incoming UCI messages does not contain an identifier thus it is not possible to match
 * different messages of same UCI message type with their origin (sender). Since all messages are
 * async streams this enforcement is mandatory. This also complies with Stockfish's logic.
 */
export class PromisedUCIQueue {
  private que: PromisedUCIQueueItem<any>[] = [];

  /**
   * Resolve a UCI_MSG_IN item and remove it from the collection.
   * Removing is mandatory, if not removed the item becomes stale.
   * @param cmd The UCI command to resolve, the
   * @param value The value to resolve.
   * @returns {boolean} True if items exists and resolved, false if not.
   */
  resolve(cmd: UCI_MSG_IN, value?: any): boolean {
    const idx = this.indexOf(cmd);
    if (idx === -1) return false;
    this.popIdx(idx).resolve(value);
    return true;
  }

  /**
   * Reject a UCI_MSG_IN item and remove it from the collection.
   * Removing is mandatory, if not removed the item becomes stale.
   * @param cmd The UCI command to reject, the
   * @param err The error to reject.
   * @returns {boolean} True if items exists and rejected, false if not.
   */
  reject(cmd: UCI_MSG_IN, err?: any): boolean {
    const idx = this.indexOf(cmd);
    if (idx === -1) return false;
    this.popIdx(idx).reject(err);
    return true;
  }

  /**
   * Add's a new item to the queue.
   * Throws if item exists.
   * @param item
   * @returns {T} The newly added item.
     */
  add<T extends PromisedUCIQueueItem<any>>(item: T): T {
    if (this.exists(item.cmd)) {
      throw new PromisedUCIQueueError(`UCI command ${UCI_MSG_IN[item.cmd]} is already queued.`);
    }
    this.que.push(item);
    return item;
  }

  /**
   * Returns the index of the item in the array.
   * @param cmd
   * @returns {number}
     */
  public indexOf(cmd: UCI_MSG_IN): number {
    for (let i = 0, len = this.que.length; i < len; i++) {
      if (this.que[i].cmd === cmd) return i;
    }
    return -1;
  }

  /**
   * Returns the item in the array.
   * @param cmd
   * @returns {PromisedUCIQueueItem<any>}
     */
  find<T>(cmd: UCI_MSG_IN): PromisedUCIQueueItem<T> {
    let idx = this.indexOf(cmd);
    return idx > -1 ? this.que[idx] : undefined;
  }

  /**
   * Checks if an item exists.
   * @param cmd
   * @returns {boolean}
     */
  exists(cmd: UCI_MSG_IN): boolean {
    return this.indexOf(cmd) > -1;
  }

  /**
   * Clear the queue.
   * Make sure to resolve/reject all returned items to prevent stale promise listeners.
   * @returns {PromisedUCIQueueItem<any>[]}
     */
  clear(): PromisedUCIQueueItem<any>[] {
    return this.que.splice(0, this.que.length-1);
  }

  /**
   * Returns an items from a specific location and remove it from the collection.
   * @param idx
   * @returns {PromisedUCIQueueItem<any>}
     */
  private popIdx(idx: number): PromisedUCIQueueItem<any> {
    return this.que.splice(idx, 1)[0];
  }
}
