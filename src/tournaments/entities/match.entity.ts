import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Phase } from './phase.entity';
import { Team } from './team.entity';
import { Tournament } from './tournaments.entity';

export abstract class MatchBaseModel extends BaseEntity {
  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: 'local_team_id' })
  local: Team;

  @ManyToOne(() => Team, { nullable: true })
  @JoinColumn({ name: 'visit_team_id' })
  visit: Team;

  @Column({ type: 'int', name: 'goals_local', default: 0 })
  goalsLocal: number;

  @Column({ type: 'int', name: 'goals_visit', default: 0 })
  goalsVisit: number;
}

@Entity()
export class Match extends MatchBaseModel {
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @ManyToOne(() => Phase, (phase) => phase.matches)
  @JoinColumn({ name: 'phase_id' })
  phase: Phase;

  @Column({ type: 'boolean', name: 'is_defined', default: false })
  isDefined: boolean;

  @Column({ type: 'boolean', name: 'is_finished', default: false })
  isFinished: boolean;
}
