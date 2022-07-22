import { Match, MatchBaseModel } from 'src/tournaments/entities/match.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Pool } from './pool.entity';

@Entity('pools_matches')
export class PoolMatch extends MatchBaseModel {
  @ManyToOne(() => Pool)
  @JoinColumn({ name: 'pool_id' })
  pool: Pool;

  @ManyToOne(() => Match)
  @JoinColumn({ name: 'match_id' })
  match: Match;

  @Column({ type: 'boolean', name: 'is_predicted', default: false })
  isPredicted: boolean;

  @Column({ type: 'boolean', name: 'is_calculated', default: false })
  isCalculated: boolean;

  @Column({ type: 'int', default: 0 })
  points: number;
}
