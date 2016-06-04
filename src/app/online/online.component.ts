import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MdSidenav } from '@angular2-material/sidenav/sidenav';
import { MdCheckboxChange } from '@angular2-material/checkbox/checkbox';

import { Subscription } from 'rxjs/Subscription';

import { ChessBoard, ChessBoardController, PieceColor, PlayerType, GAME_STATE, util } from 'ng2-chess';
import { DOM_SVG_KIT_DIRECTIVES } from '../../packages/ng2-chess/plugins/ui/dom-svg-board';
import { CHESSJS_CHESS_GAME_PROVIDERS } from '../../packages/ng2-chess/plugins/game/chessjs';

import { User, FBUsers, LoginFirebase, BusMessage, MessageFactory, MatchRef, MatchRefRole, MatchRefState, FBUser, FBMatches, FBLiveMatch, MoveMessageData, InviteMessageData } from './domain';

import { CurrentUserFilter } from './currentUserFilter.pipe';
import { OnlineFilter } from './onlineFilter.pipe';

@Component({
  selector: 'online',
  providers: [ ...CHESSJS_CHESS_GAME_PROVIDERS ],
  directives: [ ...DOM_SVG_KIT_DIRECTIVES ],
  pipes: [ CurrentUserFilter, OnlineFilter ],
  styles: [ require('./online.css') ],
  template: require('./online.html')
})
export class Online implements AfterViewInit, OnDestroy {

  @ViewChild('sidenav') private sidenav: MdSidenav;
  @ViewChild('board') private board: ChessBoard;

  user: FBUser;
  selectedUser: User;
  isInit: boolean;
  liveMatch: FBLiveMatch;

  private ctrl: ChessBoardController;
  private rxWaste: Array<Subscription> = [];

  constructor(private users: FBUsers, private login: LoginFirebase, private match: FBMatches) {
    let subs = users.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        user.user$.first().subscribe( u => {
          if (u.playing) {
            user.setPlaying(false);
          }


          // TODO: put in an observable.
          // in HTML remove filter, use special firebase query on the users$ list.
          setTimeout( () => user.keepAlive(), 16);
          // Send keep alive every 2.5 minutes
          const clearCode = setInterval( () => {
            user.keepAlive();
          }, 1000 * 60 * 2.5);

          this.rxWaste.push(<any>{ unsubscribe: () => clearInterval(clearCode) })


        });
        let subs = user.bus.incoming$.subscribe( msg => this.onBusMessage(msg) );
        this.rxWaste.push(subs);
      }
    });
    this.rxWaste.push(subs);
  }

  ngAfterViewInit() {
    this.ctrl = this.board.ctrl;
    this.ctrl.init()
      .then( () => this.sidenav.toggle(true) );
  }

  ngOnDestroy() {
    while (this.rxWaste.length > 0) {
      this.rxWaste.pop().unsubscribe();
    }
    this.users.destroy();
  }

  onAvailabilityChange(event: MdCheckboxChange) {
    this.user.user.available = event.checked;
    this.user.update();
  }

  userStatus(user: User): string {
    if (!user.available) {
      return "Not Available";
    } else if (user.playing) {
      return "Playing";
    } else {
      return "Available";
    }
  }

  /**
   * return true if the current user can init a new match.
   * the user's available property is not a factor in this check.
   */
  isFree(): boolean {
    return !this.liveMatch && !this.user.user.playing;
  }

  canInvite(): boolean {
    const su = this.selectedUser;
    return this.isFree() && su && su.available && !su.playing;
  }

  invite() {
    if (this.canInvite()) {
      this.user.invite(this.selectedUser);
    }
  }

  acceptInvite(mref: MatchRef): Promise<void> {
    return this.user.setPlaying(true)
      .then( () => this.match.createMatch(mref) )
      .then( () => this.user.acceptInvitation(mref) )
      .then( () => this.match.loadMatch(mref.matchId, this.user) )
      .then( liveMatch => this.initGame(liveMatch) );
  }

  logout() {
    this.selectedUser = undefined;
    this.login.logout();
  }

  private initGame(liveMatch: FBLiveMatch): void {
      this.liveMatch = liveMatch;

      liveMatch.setState(MatchRefState.InPlay);

      this.ctrl
        .setPlayer(PieceColor.BLACK, PlayerType.HUMAN)
        .setPlayer(PieceColor.WHITE, PlayerType.HUMAN)
        .newGame();

      this.ctrl.onMoved$.subscribe(move => {
        let p: Promise<void>;

        // if not our turn, it means that this move is for our turn
        if (liveMatch.pieceColor !== this.ctrl.turn) {
          this.board.blockUi(true);
          p = liveMatch.setMove(move.toLongAlgebraic());
        }

        if(this.ctrl.state !== GAME_STATE.ACTIVE && this.ctrl.state !== GAME_STATE.CHECK) {
          if (this.liveMatch) {
            p = p || Promise.resolve();
            p.then( () => this.endGameRoutine(MatchRefState.Done) );
          }
        }
      });

      this.board.blockUi(!liveMatch.myTurn());

      this.isInit = true;
  }

  private onBusMessage(msg: BusMessage<any>): any {
    //TODO: Handle this else where, to big for here.
    let p;

    //TODO: rejection is useless here, send message back to sender.
    if (MessageFactory.isInvite(msg)) {
      this.tryHandleInviteResponse(msg);
    } else if (MessageFactory.isMove(msg)) {
      if (!this.isMatchOf(msg.data.matchId)) {
        this.user.sendMsg(msg.sender, this.user.msgFactory.invalid(msg));
      } else {
        this.tryMoveOpponent(msg)
          .catch(err => {
            this.user.sendMsg(msg.sender, this.user.msgFactory.outOfSync(msg.data.matchId, err.toString()));
            this.endGameRoutine(MatchRefState.Canceled); //TODO: Pop up message, why game ended.
          });
      }
    } else if (MessageFactory.isOutOfSync(msg)) {
      if (this.isMatchOf(msg.data.matchId)) {
        this.endGameRoutine(MatchRefState.Canceled); //TODO: Pop up message, why game ended.
      }
    }
    return p;
  }

  /**
   * Returns true if the current match matchId matches the matchId
   * @param matchId
   * @returns {boolean}
     */
  private isMatchOf(matchId: string): boolean {
    return (!this.liveMatch || this.liveMatch.match$key !== matchId) ? false : true;
  }

  private tryHandleInviteResponse(msg: BusMessage<InviteMessageData>): Promise<void> {
    const reject = (msg) => Promise.reject(new Error(msg));
    if (!this.isFree()) {
      return reject('User is not available.');
    } else {
      return this.users.getUser(msg.sender)
        .then(user => !user && reject('Invalid sender.'))
        .then(() => this.user.getMatchRef(msg.data.token))
        .then(mref => {
          if (mref) {
            if (mref.state !== MatchRefState.Invite) {
              return this.user.responedToInvite(mref, false, 'Invalid invitation, try again.')
                .then(() => reject('Invite exists but in an invalid state.'))
            } else if (msg.data.response === false) {
              // TODO: display reason?  msg.data.reason
              return Promise.all([
                this.user.withdrawInvitation(mref, false),
                this.user.responedToInvite(mref, false, 'Invalid invitation response.')
              ]);
            } else if (msg.data.response === true) {
              return this.match.loadMatch(mref.matchId, this.user)
                .then(liveMatch => {
                  // verify the other user created the match as in invitation.
                  if (this.user.user$key !== mref.settings[liveMatch.mySide]) {
                    return reject('Invalid match configuration, try again.');
                  }
                  return this.user.setPlaying(true)
                    .then(() => this.user.updateMatchRefState(mref.matchId, MatchRefState.Ready))
                    .then(() => this.initGame(liveMatch));
                });
            } else {
              return reject('Invite exists but message does not have a response');
            }
          } else {
            return this.user.createMatchRef(MatchRefRole.Invitee, msg.data.settings.white, msg.data.settings.black, msg.data.token);
          }
        });
    }
  }

  private tryMoveOpponent(msg: BusMessage<MoveMessageData>): Promise<void> {
    let reject = (msg) => Promise.reject(new Error(msg));

    if (this.liveMatch.myTurn()) {
      return reject('Illegal move, not your turn.');
    }


    try {
      const chessMove = util.move.fromLongAlgebraic(msg.data.move),
            piece = this.ctrl.getPiece(chessMove.from),
            block = this.ctrl.getBlock(chessMove.to);

      if (!piece) {
        return reject('Invalid move, no piece on source block.');
      }

      return this.ctrl.move(piece, block, chessMove.promotion)
        .then(move => move.invalid && Promise.reject(new Error('Invalid move')) )
        .then( () => this.board.blockUi(false))

    } catch (err) {
      return Promise.reject(err);
    }

  }

  private endGameRoutine(state: MatchRefState) {
    this.board.blockUi(true);
    const r = () => {
      this.ctrl.destroy();
      this.liveMatch.destroy();
      this.liveMatch = undefined;
    };

    this.user.setPlaying(false);

    return this.liveMatch.setState(state)
      .then(r)
      .catch(r);
  }
}
