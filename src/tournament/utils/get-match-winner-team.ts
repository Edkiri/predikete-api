import { PoolMatch } from 'src/pool/entities';
import { Match, Team } from '../entities';
import { PhaseOptions } from '../interfaces/phase.enum';

export function getMatchWinnerTeam(match: Match | PoolMatch): Team | null {
  if (match.goalsLocal > match.goalsVisit) {
    return match.local;
  } else if (match.goalsLocal < match.goalsVisit) {
    return match.visit;
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
