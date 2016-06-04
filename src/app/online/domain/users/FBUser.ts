import { v1 as UUID } from 'node-uuid';
import { FirebaseObjectObservable } from 'angularfire2';
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';

import { User, MatchRef, MatchRefState, MatchRefRole } from './index';
import { MessageFactory, BusMessage, FBUserBus } from '../user_bus';
import { MATCH_TYPE } from '../match';
import { FBUsers } from './FBUsers.service';

export class FBUser {
  public user: User;
  public user$: FirebaseObjectObservable<User>;
  public matchRefs$: Observable<MatchRef[]>;

  public msgFactory: MessageFactory;
  private rxWaste: Array<Subscription> = [];

  constructor(public user$key: string, private users: FBUsers, public bus: FBUserBus) {
    this.user$ = users.getUser$(user$key);

    this.rxWaste.push( this.user$.subscribe( user => this.user = user) );

    this.matchRefs$ = users.getMatchRefs$(user$key)
      .map (refs => {
        refs.forEach( m => {
          if (!m.user_) {
            users.getUser(m.user).then( u => m.user_ = u);
          }
        });
        return refs;
      });

    this.msgFactory = new MessageFactory(user$key);
  }

  update(): Promise<void> {
    return this.users.update(this.user$key, this.user);
  }

  setPlaying(playing: boolean): Promise<void> {
    return this.users.update( this.user$key, <any>{ playing } );
  }

  /**
   * Send a bug message to a user.
   * @param to the ID of the user ($key)
   * @param msg The message
   * @returns {Promise<void>}
   */
  sendMsg(to: string, msg: BusMessage<any>): Promise<void> {
    return this.bus.send(to, msg);
  }


  keepAlive() {
    this.users.getUserResource$(this.user$key, 'lastSeen').set(new Date().getTime())
  }

  /**
   * Invite a user ($key) to an online match.
   * The user is the invitee, the inviter is the current user.
   * @param invitee
   * @returns {Promise<void>}
   **/
  invite(invitee: User): Promise<void> {
    if (!invitee.$key) {
      return Promise.reject(new Error('Invalid user $key.'))
    } else {
      // TODO: Allow user to choose sides. (currently hard coded - inviter === white)
      return this.createMatchRef(MatchRefRole.Inviter, this.user$key, invitee.$key)
        .then( mref => this.sendMsg(invitee.$key, this.msgFactory.invite(mref)) );
    }
  }

  responedToInvite(mref: MatchRef, response: boolean, reason?: string): Promise<void> {
    return this.sendMsg(mref.user, this.msgFactory.inviteResponse(mref, response, reason))
  }

  acceptInvitation(mref: MatchRef): Promise<void> {
    return this.updateMatchRefState(mref.matchId, MatchRefState.Ready)
      .then( () => {})
      .then( () => this.sendMsg(mref.user, this.msgFactory.inviteResponse(mref, true)) )
      .catch( () => this.withdrawInvitation(mref, true) )
  }

  /**
   * Remove an invite the user has received.
   */
  withdrawInvitation(mref: MatchRef, notify: boolean): Promise<void> {
    return Promise.all([
      notify ? this.sendMsg(mref.user, this.msgFactory.inviteResponse(mref, false)) : Promise.resolve(),
      this.users.getMatchRef$(this.user$key, mref.matchId).remove()
    ]) as any;
  }

  /**
   * Creates a new `MatchRef` and returns a promise of the new match id ($key)
   * @param role
   * @param white the firebase user $key of the player who plays white
   * @param black the firebase user $key of the player who plays black
   * @param uuid optional matchId, if not supplied created automatically.
   * @returns {Promise<string>}
   */
  createMatchRef(role: MatchRefRole, white: string, black: string, uuid?: string): Promise<MatchRef> {
    const matchId = uuid ? uuid : UUID(),
          mref: MatchRef = {
            timestamp: Date.now(),
            role,
            user: white === this.user$key ? black : white,
            state: MatchRefState.Invite,
            matchId,
            settings: { black, white, type: MATCH_TYPE.SuddenDeath }
          };

    return this.users.getMatchRef$(this.user$key, matchId).set(mref).then( () => mref );
  }

  updateMatchRefState(matchId: string, state: MatchRefState): Promise<void> {
    return this.users.getMatchRefState$(this.user$key, matchId).set(state);
  }

  getMatchRef(matchId: string): Promise<MatchRef> {
    return this.users.getMatchRef(this.user$key, matchId);
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
