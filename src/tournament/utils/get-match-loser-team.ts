import { PoolMatch } from 'src/pool/entities';
import { Match } from '../entities';
import { PhaseOptions } from '../interfaces/phase.enum';

export function getMatchLoserTeam(match: PoolMatch | Match) {
  if (match.goalsLocal > match.goalsVisit) {
    return match.visit;
  } else if (match.goalsLocal < match.goalsVisit) {
    return match.local;
  } else {
    let phase: PhaseOptions;
    if (match instanceof Match) {
      phase = match.phase;
    } else {
      phase = match.tournamentMatch.phase;
    }
    if (phase === PhaseOptions.GROUP_STAGE) return null;

    if (match.penalsLocal > match.penalsVisit) return match.local;
    if (match.penalsLocal < match.penalsVisit) return match.visit;
  }
}
