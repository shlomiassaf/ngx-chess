import { FirebaseAuthState, AuthProviders } from 'angularfire2';
import { MATCH_TYPE } from '../match';

interface AuthInfo {
  displayName: string;
  profileImageURL: string;
}

interface FirebaseRecord {
  $key: string;
}

export enum MatchRefRole {
  Inviter,
  Invitee
}


export enum MatchRefState {
  // hard coded values, don't change used in DB.
  Invite = 0,
  Ready = 1,
  InPlay = 2,
  Done = 3,
  Canceled = 4
}

export interface MatchRef {
  role: MatchRefRole,
  timestamp: number;
  user: string;
  matchId: string;
  state: MatchRefState;
  settings: MatchRefSettings
}

export interface MatchRefSettings {
  black: string;
  white: string;
  type: MATCH_TYPE;
}

export class User implements FirebaseRecord {
  $key: string;

  displayName: string;
  pic: string;
  provider: string;
  available: boolean;
  playing: boolean;
  lastSeen: number;
  
  match_refs: MatchRef;


  static create(auth: FirebaseAuthState): User {
    const user = new User();
    user.provider = AuthProviders[auth.provider];

    let info: AuthInfo;
    switch (auth.provider) {
      case AuthProviders.Twitter:
        info = auth.twitter;
        break;
      case AuthProviders.Facebook:
        info = auth.facebook;
        break;
    }

    if (info) {
      user.displayName = info.displayName;
      user.pic = info.profileImageURL;
    }

    return user;
  }
}
