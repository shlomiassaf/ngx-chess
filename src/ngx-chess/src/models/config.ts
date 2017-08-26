import { PlayerType } from './enums';

export interface AIQuery {
  depth?: number;
  /**
   * Limit the query by time. (in milliseconds)
   */
  limit?: number;
  black?: AIQueryRestrictions;
  white?: AIQueryRestrictions;
}

export interface AIQueryRestrictions {
  /**
   * Total game time left. (in milliseconds)
   */
  time?: number;

  /**
   * Increment time per move. (in milliseconds)
   * Valid only when time > 0.
   */
  inc?: number;
}

export class PlayerSettings {
  player: PlayerType = PlayerType.HUMAN;
  time: number;
  /**
   * Increment per move in milliseconds.
   * Valid only when time > 0.
   */
  inc: number;

  /**
   * A Value representing the AI level, optional.
   */
  aiLevel: number;
}
