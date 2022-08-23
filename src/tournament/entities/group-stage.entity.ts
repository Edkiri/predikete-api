import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
// import { Match } from './match.entity';
import { Team } from './team.entity';
import { Tournament } from './tournaments.entity';
import { Exclude } from 'class-transformer';
import { Match } from './match.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity('tournament_group_stage')
export class GroupStage extends BaseEntity {
  @ApiModelProperty()
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament!: Tournament;

  @ApiModelProperty()
  @Column({ type: 'varchar', nullable: true })
  name!: string;

  @Exclude()
  @OneToMany(() => Match, (match) => match.groupStage, {
    nullable: true,
  })
  matches?: Match[];

  @Exclude()
  @OneToMany(() => Team, (team) => team.groupStage)
  teams?: Team[];
}
