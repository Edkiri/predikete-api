import { BaseEntity } from 'src/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IGroupStage } from '../models/group-stage.interface';
import { Match } from './match.entity';
import { Team } from './team.entity';
import { Tournament } from './tournaments.entity';

@Entity()
export class GroupStage extends BaseEntity implements IGroupStage {
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @OneToMany(() => Match, (match) => match.phase, {
    nullable: true,
    cascade: true,
  })
  matches: Match[];

  @ManyToMany(() => Team)
  @JoinTable({
    name: 'teams-group-stages',
    joinColumn: {
      name: 'group_stage_id',
    },
    inverseJoinColumn: {
      name: 'team_id',
    },
  })
  teams: Team[];
}
