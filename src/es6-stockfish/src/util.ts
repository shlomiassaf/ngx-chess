export const LONG_ALG_NOTATION_RE = /^[a-h]\d[a-h]\d[qkbn]?$/;

/**
 * Returns a string from an incoming message parameter in the onmessage handler.
 *
 * @param incoming
 * @returns {string|{data: string}}
 */
export function flatMessage(incoming: string | MessageEvent): string {
  return typeof incoming === 'string' ? incoming : incoming && incoming.data;
}

//https://github.com/angular/angular/blob/master/modules/%40angular/facade/src/promise.ts
export class PromiseCompleter<R> {
  promise: Promise<R>;
  resolve: (value?: R | PromiseLike<R>) => void;
  reject: (error?: any, stackTrace?: string) => void;

  constructor() {
    this.promise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
}

export function enumAsStr(enumType: any, key: any): string {
  return enumType[key];
}
