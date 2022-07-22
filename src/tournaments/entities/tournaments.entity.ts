import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';
import { Team } from './team.entity';
import { GroupStage } from './group-stage.entity';

@Entity('tournaments')
export class Tournament extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'boolean', name: 'is_finished', default: false })
  isFinished: boolean;

  @ManyToMany(() => Team)
  @JoinTable({
    name: 'teams-tournaments',
    joinColumn: {
      name: 'tournament_id',
    },
    inverseJoinColumn: {
      name: 'team_id',
    },
  })
  teams: Team[];

  @OneToMany(() => GroupStage, (groupStage) => groupStage.tournament)
  groupStages: GroupStage[];
}
