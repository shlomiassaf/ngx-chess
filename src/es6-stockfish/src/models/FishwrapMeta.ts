import { CheckOptionResponse, SpinOptionResponse } from './OptionResponse';
export class FishwrapMeta {
  id: {
    name: string;
    author: string;
  };

  option: {
    WriteDebugLog: CheckOptionResponse;
    Contempt: SpinOptionResponse;
    Mobility$Midgame$: SpinOptionResponse;
    Mobility$Endgame$: SpinOptionResponse;
    PawnStructure$Midgame$: SpinOptionResponse;
    PawnStructure$Endgame$: SpinOptionResponse;
    PassedPawns$Midgame$: SpinOptionResponse;
    PassedPawns$Endgame$: SpinOptionResponse;
    Space: SpinOptionResponse;
    KingSafety: SpinOptionResponse;
    MinSplitDepth: SpinOptionResponse;
    Threads: SpinOptionResponse;
    Hash: SpinOptionResponse;
    Ponder: CheckOptionResponse;
    MultiPV: SpinOptionResponse;
    SkillLevel: SpinOptionResponse;
    SkillLevelMaximumError: SpinOptionResponse;
    SkillLevelProbability: SpinOptionResponse;
    MoveOverhead: SpinOptionResponse;
    MinimumThinkingTime: SpinOptionResponse;
    SlowMover: SpinOptionResponse;
    UCI_Chess960: CheckOptionResponse;
  };

  constructor() {
    this.id = {} as any;
    this.option = {} as any;
  }
}


