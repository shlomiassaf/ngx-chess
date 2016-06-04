import { v1 as UUID } from 'node-uuid';

import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { BusMessage, validate } from './BusMessage';
import { FBUserBus } from './FBUserBus';

export const url = {
  bus: (id: string) => `/user_bus/${id}`,
  busMsg: (id: string) => `${url.bus(id)}/${UUID()}`,
};

class PromiseCompleter<R> {
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


@Injectable()
export class FBUserBusFactory {
  constructor(private af: AngularFire) {}

  send(id: string, message: BusMessage<any>): Promise<void> {
    let error = validate(message);
    if (error) {
      return Promise.reject(error);
    } else {
      return this.af.database.object(url.busMsg(id)).set(message);
    }
  }

  create(user$key: string): FBUserBus {
    return new FBUserBus(this, user$key);
  }

  getUserBus$(user$key: string): FirebaseListObservable<BusMessage<any>[]> {
    return this.af.database.list(url.bus(user$key));
  }

  removeBusMessage(user$key: string, msg$key: string): Promise<void> {
    return this.af.database.object(`${url.bus(user$key)}/${msg$key}`).remove();
  }
}
