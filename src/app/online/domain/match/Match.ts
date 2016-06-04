import { MatchRefState } from '../users';

export enum MATCH_TYPE {
  SuddenDeath
}

export interface MatchMeta {
  state: MatchRefState;
  moves: string[];
}

export class Match {
  constructor(white: string, black: string, type: MATCH_TYPE = MATCH_TYPE.SuddenDeath) {
    this.black = black;
    this.white = white;
    this.type = type;

    this.blackMeta = {
      state: MatchRefState.Ready,
      moves: []
    };

    this.whiteMeta = {
      state: MatchRefState.Ready,
      moves: []
    };
  }

  /**
   * uid of user play with black pieces.
   */
  black: string;

  /**
   * uid of user play with with pieces.
   */
  white: string;

  type: MATCH_TYPE;

  blackMeta: MatchMeta;
  whiteMeta: MatchMeta;
}
