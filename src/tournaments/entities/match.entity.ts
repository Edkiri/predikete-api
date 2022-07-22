import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GroupStage } from './group-stage.entity';
import { Phase } from './phase.entity';
import { Team } from './team.entity';
import { Tournament } from './tournaments.entity';
import { Exclude } from 'class-transformer';

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

@Entity('matches')
export class Match extends MatchBaseModel {
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @ManyToOne(() => Phase, (phase) => phase.matches, { nullable: true })
  @JoinColumn({ name: 'phase_id' })
  phase: Phase;

  @ManyToOne(() => GroupStage, (groupStage) => groupStage.matches, {
    nullable: true,
  })
  @JoinColumn({ name: 'group_stage_id' })
  groupStage: GroupStage;

  @Exclude()
  @Column({
    type: 'boolean',
    name: 'is_defined',
    default: false,
  })
  isDefined: boolean;

  @Column({
    type: 'boolean',
    name: 'is_finished',
    default: false,
  })
  isFinished: boolean;

  @Column({ type: 'timestamp', name: 'start_at' })
  startAt: Date;

  @Column({
    name: 'local_condition',
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  localCondition: string;

  @Column({
    name: 'visit_condition',
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  visitCondition: string;

  @Column({
    type: 'smallint',
    nullable: true,
  })
  journey: number;
}
