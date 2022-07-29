import { BaseEntity } from '../../database/entities/base.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from './team.entity';

export abstract class MatchBaseModel extends BaseEntity {
  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: 'local_team_id' })
  local: Team;

  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: 'visit_team_id' })
  visit: Team;

  @Column({ type: 'int', name: 'goals_local', nullable: true })
  goalsLocal: number;

  @Column({ type: 'int', name: 'goals_visit', nullable: true })
  goalsVisit: number;

  @Column({ type: 'int', name: 'penals_local', nullable: true })
  penalsLocal: number;

  @Column({ type: 'int', name: 'penals_visit', nullable: true })
  penalsVisit: number;
}
