/**
 * Outgoing UCI message codes
 */
export enum UCI_MSG_OUT {
  uci,
  debug,
  isready,
  setoption,
  register,
  ucinewgame,
  position,
  go,
  stop,
  ponderhit,
  quit
}
export module UCI_MSG_OUT {
  export function asStr(code: UCI_MSG_OUT): string {
    return UCI_MSG_OUT[code];
  }
}



/**
 * Incoming UCI message codes
 */
export enum UCI_MSG_IN {
  /**
   * name <x> this must be sent after receiving the "uci" command to identify the engine,
   * e.g. "id name Shredder X.Y\n"
   * author <x> this must be sent after receiving the "uci" command to identify the engine,
   * e.g. "id author Stefan MK\n"
   */
  id,
  /**
   * Must be sent after the id and optional options to tell the GUI that the engine has sent all
   * infos and is ready in uci mode.
   */
  uciok,
  /**
   * This must be sent when the engine has received an "isready" command and has processed all input
   * and is ready to accept new commands now. It is usually sent after a command that can take some
   * time to be able to wait for the engine, but it can be used anytime, even when the engine is
   * searching, and must always be answered with "isready".
   */
  readyok,
  bestmove,
  copyprotection,
  registration,
  info,
  option
}
export module UCI_MSG_IN {
  export function asStr(code: UCI_MSG_IN): string {
    return UCI_MSG_IN[code];
  }
}

export enum POSITION_SET_TYPE {
  fen,
  startpos
}
export module POSITION_SET_TYPE {
  export function asStr(code: POSITION_SET_TYPE): string {
    return POSITION_SET_TYPE[code];
  }
}

export enum OPTION_NAME {
  WriteDebugLog,
  Contempt,
  Mobility$Midgame$,
  Mobility$Endgame$,
  PawnStructure$Midgame$,
  PawnStructure$Endgame$,
  PassedPawns$Midgame$,
  PassedPawns$Endgame$,
  Space,
  KingSafety,
  MinSplitDepth,
  Threads,
  Hash,
  Ponder,
  MultiPV,
  SkillLevel,
  SkillLevelMaximumError,
  SkillLevelProbability,
  MoveOverhead,
  MinimumThinkingTime,
  SlowMover,
  UCI_Chess960,
  ClearHash
}
export module OPTION_NAME {
  export function asStr(code: OPTION_NAME): string {
    return OPTION_NAME[code];
  }

  /**
   * Return the option name as stockfish engine name
   * @param code
   * @returns {any}
     */
  export function asSFStr(code: OPTION_NAME): string {
    return OPTION_NAME.asStr(code)
      .replace(/([A-Z])/g, ($1) => ' ' + $1)
      .replace(/\$/, ' (')
      .replace(/\$$/, ')')
      .trim();
  }
}
