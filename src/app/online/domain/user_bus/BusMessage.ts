import { MATCH_TYPE } from '../match';
import { MatchRef, MatchRefSettings } from '../users';

export enum BUS_MESSAGE_TYPE {
  Invite,
  Move,
  OutOfSync,
  Invalid,
  EndGame
}

export enum END_GAME_REQUEST_TYPE {
  Forfit,
  Draw
}


const validators: { [type: number]: Array<(bus: BusMessage<any>) => Error> } = <any>{};
export function validate(bus: BusMessage<any>): Error {
  if (typeof BUS_MESSAGE_TYPE[bus.type] === 'undefined') {
    return new Error(`Unknown MESSAGE_BUS_TYPE ${bus.type}`);
  }

  const typeValidators = validators[bus.type];
  if (typeValidators) {
    let i = typeValidators.length, err: Error;

    while (i--) {
      if (err = typeValidators[i](bus)) {
        return err;
      }
    }
  }
}
export function register(type: BUS_MESSAGE_TYPE , validator: (bus: BusMessage<any>) => Error): void {
  if (typeof validator !== 'function') {
    throw new Error('Validator must be a function.');
  } else if (!Array.isArray(validators[type])) {
    validators[type] = [];
  }

  validators[type].push(validator);
}

export class BusMessage<T> {
  public $key: string;
  public type: BUS_MESSAGE_TYPE;
  public sender: string;
  public timestamp: number;

  public data: T;

  constructor(type: BUS_MESSAGE_TYPE, sender: string, data?: T) {
    this.type = type;
    this.sender = sender;
    this.timestamp = Date.now();
    if (data !== undefined) {
      this.data = data;
    }
  }
}

export interface InviteMessageData {
  token: string;

  settings?: MatchRefSettings;

  /**
   * True to accept, false to decline.
   */
  response?: boolean;
  reason?: string;
}

export interface MoveMessageData {
  matchId: string;
  move: string;
}

export interface OutOfSyncMessageData {
  matchId: string;
  reason: string;
}

export interface InvalidMessageMessageData {
  orgMessage: BusMessage<any>;
  reason?: string;
}

export class MessageFactory {
  constructor(private senderId: string) {}

  invite(mref: MatchRef): BusMessage<InviteMessageData> {
    return this.create(BUS_MESSAGE_TYPE.Invite, {
      token: mref.matchId,
      settings: mref.settings
    });
  }

  inviteResponse(mref: MatchRef, response: boolean, reason: string = null): BusMessage<InviteMessageData> {
    return this.create(BUS_MESSAGE_TYPE.Invite, { token: mref.matchId, response, reason });
  }

  move(matchId: string, move: string): BusMessage<MoveMessageData> {
    return this.create(BUS_MESSAGE_TYPE.Move, { matchId, move });
  }

  outOfSync(matchId: string, reason): BusMessage<OutOfSyncMessageData> {
    return this.create(BUS_MESSAGE_TYPE.OutOfSync, { matchId, reason });
  }

  invalid(orgMessage: BusMessage<any>, reason?: string): BusMessage<InvalidMessageMessageData> {
    return this.create(BUS_MESSAGE_TYPE.Invalid, { orgMessage, reason });
  }

  endGame(endGameRequest: END_GAME_REQUEST_TYPE): BusMessage<END_GAME_REQUEST_TYPE> {
    return this.create(BUS_MESSAGE_TYPE.EndGame, endGameRequest);
  }

  private create<T>(type: BUS_MESSAGE_TYPE, data?: T) : BusMessage<T> {
    return new BusMessage<T>(type, this.senderId, data);
  }

  static isInvite(msg: BusMessage<any>): msg is BusMessage<InviteMessageData> {
    return msg && msg.type === BUS_MESSAGE_TYPE.Invite;
  }

  static isMove(msg: BusMessage<any>): msg is BusMessage<MoveMessageData> {
    return msg && msg.type === BUS_MESSAGE_TYPE.Move;
  }

  static isOutOfSync(msg: BusMessage<any>): msg is BusMessage<OutOfSyncMessageData> {
    return msg && msg.type === BUS_MESSAGE_TYPE.OutOfSync;
  }

  static isInvalid(msg: BusMessage<any>): msg is BusMessage<InvalidMessageMessageData> {
    return msg && msg.type === BUS_MESSAGE_TYPE.Invalid;
  }
}




