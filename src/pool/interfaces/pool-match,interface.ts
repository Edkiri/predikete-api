import { Pool } from 'pg';
import { Match } from 'src/tournament/entities/match.entity';

export interface IPoolMatch {
  pool: Pool;
  tounrnamentMatch: Match;
  points?: number;
  isCalculated?: boolean;
}
