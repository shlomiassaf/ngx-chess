import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Subscription } from 'rxjs/Subscription';

import { PieceColor } from 'ng2-chess';

import { FBUser, MatchRefState } from '../users';
import { Match } from './Match';
import { FBMatches } from './FBMatches';

export abstract class FBLiveMatch {
  public match$: FirebaseObjectObservable<Match>;
  public blackMoves$: FirebaseListObservable<string[]>;
  public whiteMoves$: FirebaseListObservable<string[]>;

  /**
   * This piece color of the user paried with this live match instance.
   */
  public pieceColor: PieceColor;

  get mySide(): 'black' | 'white' {
    return this.myMoves$ === this.blackMoves$ ? 'black' : 'white';
  }

  protected match: Match;
  protected myMoves$: FirebaseListObservable<string[]>;
  protected opponent$key: string;

  protected moves = { w: [], b: [] };
  protected rxWaste: Array<Subscription> = [];

  constructor(private matchSvc: FBMatches, public match$key: string, private user: FBUser) {
    this.match$ = matchSvc.getMatch$(match$key);
    this.blackMoves$ = matchSvc.getMatchMoves$(match$key, 'black');
    this.whiteMoves$ = matchSvc.getMatchMoves$(match$key, 'white');

    this.rxWaste.push( this.blackMoves$.subscribe(m => this.moves.b = m) );
    this.rxWaste.push( this.whiteMoves$.subscribe(m => this.moves.w = m) );
  }
  
  movesValid(): boolean {
    let l = this.moves.w.length - this.moves.b.length;
    return l === 0 || l === 1;
  }

  turn(): PieceColor {
    return this.moves.w.length > this.moves.b.length ? PieceColor.BLACK : PieceColor.WHITE;
  }

  myTurn(): boolean {
    switch (this.turn()) {
      case PieceColor.WHITE:
        return this.match.white === this.user.user$key;
      case PieceColor.BLACK:
        return this.match.black === this.user.user$key;
    }
  }

  setState(state: MatchRefState): Promise<void> {
    return this.matchSvc.getMatchMetaState$(this.match$key, this.mySide).set(state);
  }

  setMove(move: string): Promise<void> {
    if (this.myTurn()) {
      // TODO: Ping/Pong - get approval from remote?.
      return this.user.sendMsg(this.opponent$key, this.user.msgFactory.move(this.match$key, move))
        .then( () => this.myMoves$.push(move) );
    } else {
      return Promise.reject(new Error('Not your turn.'));
    }
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

  static load(matchSvc: FBMatches, matchId: string, user: FBUser): Promise<FBLiveMatch> {
    const liveMatch: FBLiveMatch = new FBLiveMatch_(matchSvc, matchId, user);
    return liveMatch.match$.take(1).toPromise().then( m => {
      liveMatch.match = m;
      liveMatch.myMoves$ = m.black === user.user$key ? liveMatch.blackMoves$ : liveMatch.whiteMoves$;
      liveMatch.opponent$key = m.black === user.user$key ? m.white: m.black;

      let pc: PieceColor;
      if (user.user$key === m.black) {
        pc = PieceColor.BLACK;
      } else if (user.user$key === m.white) {
        pc = PieceColor.WHITE;
      } else {
        return <any>Promise.reject('Player is not assigned to black/white on this match.')
      }

      Object.defineProperty(liveMatch, 'pieceColor', { value: pc });

      return liveMatch;
    });
  }
}

class FBLiveMatch_ extends FBLiveMatch {}
