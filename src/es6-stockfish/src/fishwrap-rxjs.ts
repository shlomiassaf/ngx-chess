import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { FishWrap, Stockfish } from './fishwrap';
import { flatMessage } from './util';


function stockfishObservable(sf: Stockfish): Observable<any> {
  const o = new Observable<any>(
    obs => sf.onmessage = (incoming: string | MessageEvent) => obs.next(incoming) );
  
  return o.map( msg => flatMessage(msg)).filter( msg => !!msg );
}

/**
 * A modern JS wrapper around the StockfishJS chess enigne
 */
export class FishWrapRxJS extends FishWrap {
  messages: Subject<string> = new Subject<string>();
  private sfObservable: Observable<any>;
  private sfSubscription: Subscription;
  
  
  protected createStream(): void {
    if (!this.sfObservable) {
      this.sfObservable = stockfishObservable(this.sf);
    }
    
    this.sfSubscription = this.sfObservable.subscribe(msg => {
        this.route(msg);
        this.messages.next(msg);
    });
  }


  destroy(): void {
    super.destroy();
    
    if (this.sfSubscription && !this.sfSubscription.closed) {
      this.sfSubscription.unsubscribe();
    }
  }
}
