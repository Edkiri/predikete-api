import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Exclude } from 'class-transformer';
// import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { GroupStage } from './group-stage.entity';
import { Team } from './team.entity';
// import { GroupStage } from './group-stage.entity';

@Entity('tournament')
export class Tournament extends BaseEntity {
  @ApiModelProperty()
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @ApiModelProperty()
  @Column({ type: 'boolean', name: 'is_finished', default: false })
  isFinished!: boolean;

  @ApiModelPropertyOptional()
  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Exclude()
  @ManyToMany(() => Team, { nullable: true })
  @JoinTable({
    name: 'tournament_tournament_team',
    joinColumn: {
      name: 'tournament_id',
    },
    inverseJoinColumn: {
      name: 'team_id',
    },
  })
  teams?: Team[];

  @Exclude()
  @OneToMany(() => GroupStage, (groupStage) => groupStage.tournament, {
    nullable: true,
  })
  groupStages?: GroupStage[];
}
