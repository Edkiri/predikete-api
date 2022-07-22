import { DateTime } from 'luxon';
import { PhaseOptions } from '../entities/phase.entity';

export interface IMatch {
  local?: string;
  visit?: string;
  goalsLocal?: number;
  goalsVisit?: number;
  penalsLocal?: number;
  penalsVisit?: number;
  phase?: PhaseOptions;
  groupStageName?: string;
  startAt: DateTime;
  localCondition?: string;
  visitCondition?: string;
  journey?: number;
}
