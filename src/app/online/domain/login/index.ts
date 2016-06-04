import { Injectable, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

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

@Injectable()
export class LoginFirebase {

  constructor(private af: AngularFire) {

  }

  logout() {
    this.af.auth.logout();
  }
  
  facebook() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  twitter() {
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Redirect
    });
  }
}
