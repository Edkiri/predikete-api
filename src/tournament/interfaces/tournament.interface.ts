import { DateTime } from 'luxon';
import { PhaseOptions } from './phase.enum';

export interface ITournament {
  name: string;
  image?: string;
}

export interface ITeam {
  name: string;
  image?: string;
  groupStageName: string;
}

export interface IGroupStage {
  name: string;
}

export interface IMatch {
  startAt: DateTime;
  local?: string;
  visit?: string;
  goalsLocal?: number;
  goalsVisit?: number;
  penalsLocal?: number;
  penalsVisit?: number;
  phase?: PhaseOptions;
  groupStageName?: string;
  localCondition?: string;
  visitCondition?: string;
  journey?: number;
}

// export interface IStats {
//   teamName: string;
//   played: number;
//   wins: number;
//   losses: number;
//   ties: number;
//   goalsScored: number;
//   goalsReceived: number;
//   points: number;
// }

// export interface IGroupStageStats {
//   name: string;
//   stats: IStats[];
// }
