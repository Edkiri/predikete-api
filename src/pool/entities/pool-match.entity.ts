import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Pool } from './pool.entity';
import { Match } from '../../tournament/entities/match.entity';
import { MatchBaseModel } from '../../tournament/entities/match.entity-abs';
import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity({ name: 'pool_match' })
export class PoolMatch extends MatchBaseModel {
  @ApiModelProperty()
  @Column({ default: 0 })
  points!: number;

  @Exclude()
  @ManyToOne(() => Pool, (pool) => pool.poolMatches)
  @JoinColumn({ name: 'pool_id' })
  @Index()
  pool!: Pool;

  @RelationId((poolMatch: PoolMatch) => poolMatch.pool)
  @ApiModelProperty()
  poolId: number;

  @Exclude()
  @ManyToOne(() => Match)
  @JoinColumn({ name: 'tournament_match_id' })
  @Index()
  tournamentMatch!: Match;

  @Exclude()
  @Column({ type: 'boolean', name: 'is_predicted', default: false })
  isPredicted!: boolean;

  @Exclude()
  @Column({ name: 'is_calculated', type: 'boolean', default: false })
  isCalculated!: boolean;
}
