import { PhaseOptions } from 'src/tournament/interfaces/phase.enum';
import { getMatchLoserTeam, getMatchWinnerTeam } from 'src/tournament/utils';
import { PoolMatch } from '../entities';

export function calculatePoolMatchPoints(poolMatch: PoolMatch) {
  let points = 0;
  const { tournamentMatch } = poolMatch;

  const poolMatchTeamWinner = getMatchWinnerTeam(poolMatch);
  const tournamentMatchTeamWinner = getMatchWinnerTeam(tournamentMatch);
  const hitExactResult =
    poolMatchTeamWinner.id === tournamentMatchTeamWinner.id &&
    poolMatch.goalsLocal === tournamentMatch.goalsLocal &&
    poolMatch.goalsVisit === tournamentMatch.goalsVisit;
  if (hitExactResult) {
    points += 5;
  } else {
    const hitMatchWinner = Boolean(
      poolMatchTeamWinner &&
        tournamentMatchTeamWinner &&
        poolMatchTeamWinner.id === tournamentMatchTeamWinner.id,
    );

    if (hitMatchWinner && tournamentMatch.phase !== PhaseOptions.FINAL) {
      points += 3;
    }

    const hitTieMatch = Boolean(
      !poolMatchTeamWinner && !tournamentMatchTeamWinner,
    );
    if (hitTieMatch) return (points += 1);
  }

  if (tournamentMatch.phase) {
    const poolMatchTeamLoser = getMatchLoserTeam(poolMatch);
    const tournamentMatchTeamLoser = getMatchLoserTeam(tournamentMatch);
    if (
      poolMatch.local.id === tournamentMatch.local.id ||
      poolMatch.local.id === tournamentMatch.visit.id
    ) {
      points += 1;
    }
    if (
      poolMatch.visit.id === tournamentMatch.local.id ||
      poolMatch.visit.id === tournamentMatch.visit.id
    ) {
      points += 1;
    }
    if (tournamentMatch.phase === PhaseOptions.FINAL) {
      if (poolMatchTeamWinner.id === tournamentMatchTeamWinner.id) {
        points += 15;
      }
      if (poolMatchTeamLoser.id === tournamentMatchTeamLoser.id) {
        points += 10;
      }
    }
  }

  return points;
}
