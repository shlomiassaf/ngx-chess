import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { FBUser, MatchRefState } from '../users';
import { Match, MatchMeta } from './Match';
import { FBLiveMatch } from './FBLiveMatch';
import { MatchRef } from "../users/User";

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
export class FBMatches {
  constructor(private af: AngularFire) {}

  /**
   * Creates a match and returns a promise of the match id.
   * @param matchId
   * @param mrefSettings Settings for the game
   * @returns {Promise<void>}
     */
  createMatch(mref: MatchRef): Promise<void> {
    const match = new Match(mref.settings.white, mref.settings.black, mref.settings.type);
    return this.af.database.object(`/matches/${mref.matchId}`).set(match);
  }

  /**
   * Loads a match
   * @param matchId
   * @param user The current logged in user.
   * @returns {FBLiveMatch}
     */
  loadMatch(matchId: string, user: FBUser): Promise<FBLiveMatch> {
    return FBLiveMatch.load(this, matchId, user);
  };

  getMatch$(match$key: string): FirebaseObjectObservable<Match> {
    return this.af.database.object(`/matches/${match$key}`);
  }

  getMatchMoves$(match$key: string, side: 'black' | 'white'): FirebaseListObservable<string[]> {
    return this.af.database.list(`/matches/${match$key}/${side}Meta/moves`);
  }

  getMatchMeta$(match$key: string, side: 'black' | 'white'): FirebaseObjectObservable<MatchMeta> {
    return this.af.database.object(`/matches/${match$key}/${side}Meta`);
  }

  getMatchMetaState$(match$key: string, side: 'black' | 'white'): FirebaseObjectObservable<MatchRefState> {
    return this.af.database.object(`/matches/${match$key}/${side}Meta/state`);
  }

}


