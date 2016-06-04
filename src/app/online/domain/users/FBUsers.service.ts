import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";
import 'rxjs/operator/toPromise';

import { User, MatchRef, MatchRefState } from './User';
import { FBUserBusFactory, BusMessage } from '../user_bus';
import { FBUser } from './FBUser';

const url = {
  users: () => `/users`,
  user: (id: string) => `${url.users()}/${id}`,
  match_refs: (id: string) => `${url.user(id)}/match_refs`
};

@Injectable()
export class FBUsers {
  public users$: FirebaseListObservable<User[]>;
  public currentUser$: Observable<FBUser>;

  /**
   * When false means authentication is still running.
   * True doesn't means a successful authentication, just means it's done.
   */
  public authDone: boolean;

  private currentUserEmitter: Subject<FBUser>;

  private rxWaste: Array<Subscription> = [];

  constructor(private af: AngularFire, private bus: FBUserBusFactory) {
    this.currentUserEmitter = new Subject<FBUser>();
    this.currentUser$ = this.currentUserEmitter.asObservable();
    this.users$ = <any>af.database.list(url.users());

    let subscription = af.auth.subscribe( auth => {
      if (auth && auth.uid) {
        this.getUser(auth.uid)
          .then( user => {
            if (user) {
              return user;
            } else {
              return this.getUser$(auth.uid).set(User.create(auth))
                .then( () => this.getUser(auth.uid) );
            }
          })
          .then( user => {
            this.currentUserEmitter.next(new FBUser(user.$key, this, bus.create(user.$key)));
            this.authDone = true;
          });
      } else {
        this.currentUserEmitter.next(null);
        this.users$ = undefined;
        this.unsubscribe();
        this.authDone = true;
      }
    });
    this.rxWaste.push(subscription);
  }

  getUser$($key: string): FirebaseObjectObservable<User> {
    return this.af.database.object(url.user($key));
  }

  /**
   * Returns a specific resource in the user object
   * i.e: /users/1234567/resource
   * @param $key
   * @param resource
   * @returns {FirebaseObjectObservable<any>}
     */
  getUserResource$($key: string, resource: string): FirebaseObjectObservable<User> {
    return this.af.database.object(url.user($key) + `/${resource}`);
  }

  /**
   * A User fetch operation, only 1 call not a stream.
   * @param $key
   * @param set$Key If true will set the $key property on the user, since this is a direct object fetch
   *                firebase will not plant the $key as it does with lists.
   * @returns {Promise<User>}
     */
  getUser($key: string, set$Key: boolean = true): Promise<User> {
    return this.af.database.object(url.user($key))
      .take(1)
      .toPromise()
      .then( user => { // we need the $key
        if (user && set$Key) user.$key = $key;
        return user;
      });
  }


  getMatchRefs$(user$key: string): FirebaseListObservable<MatchRef[]> {
    return this.af.database.list(url.match_refs(user$key));
  }

  getMatchRef$(user$key: string, matchRef$key: string): FirebaseObjectObservable<MatchRef> {
    return this.af.database.object(url.match_refs(user$key) + `/${matchRef$key}`);
  }

  getMatchRefState$(user$key: string, matchRef$key: string): FirebaseObjectObservable<MatchRefState> {
    return this.af.database.object(url.match_refs(user$key) + `/${matchRef$key}/state`);
  }

  /**
   * A User fetch operation, only 1 call not a stream.
   * @param $key
   * @param set$Key If true will set the $key property on the user, since this is a direct object fetch
   *                firebase will not plant the $key as it does with lists.
   * @returns {Promise<User>}
   */
  getMatchRef(user$key: string, matchRef$key: string): Promise<MatchRef> {
    return this.getMatchRef$(user$key, matchRef$key)
      .take(1)
      .toPromise();
  }

  /**
   * Send a bug message to a user.
   * @param from the ID of the user ($key)
   * @param to the ID of the user ($key)
   * @param msg The message
   * @returns {Promise<void>}
   */
  sendMsg(to: string, msg: BusMessage<any>): Promise<void> {
    return this.bus.send(to, msg);
  }


  /**
   * Updates a user object.
   * @param user
   * @returns {Promise<void>}
   */
  update(user$key: string, user: User): Promise<void> {
    const VALID_FB_KEY = /[\[\].#$\/\u0000-\u001F\u007F]/;

    const obj: any = {};
    for (let k in user) {
      if (user.hasOwnProperty(k) && ! VALID_FB_KEY.exec(k)) {
        obj[k] = user[k];
      }
    }
    return this.users$.update(user$key, obj);
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
}

