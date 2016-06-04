import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { BusMessage } from './BusMessage';
import { url, FBUserBusFactory } from './FBUserBusFactory.service';

export class FBUserBus {
  incoming$: Observable<BusMessage<any>>;

  private _subject: ReplaySubject<BusMessage<any>>;
  private rxWaste: Array<Subscription> = [];

  constructor(private bus: FBUserBusFactory, private user$key: string) {
    this._subject  = new ReplaySubject<BusMessage<any>>(1);
    this.incoming$ = this._subject.asObservable();

    bus.getUserBus$(user$key).remove()
      .then( () => {
        this.rxWaste.push(
          bus.getUserBus$(user$key).subscribe( msg => this.onIncomingMessage(msg) )
        );
      });
  }

  send(id: string, message: BusMessage<any>): Promise<void> {
    return this.bus.send(id, message);
  }

  destroy(): void {
    this.unsubscribe();
  }

  /**
   * clear all registered subscriptions
   */
  private unsubscribe(): void {
    while (this.rxWaste.length > 0) {
      this.rxWaste.pop().unsubscribe();
    }
  }

  private onIncomingMessage(messages: BusMessage<any>[]): void {
    if (messages.length === 0) return;
    for (let m of messages) {
      this.bus.removeBusMessage(this.user$key, m.$key);
      this._subject.next(m);
    }
  }
}
