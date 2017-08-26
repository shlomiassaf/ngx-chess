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
  quit,
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

export enum POSITION_SET_TYPE {
  fen,
  startpos
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
