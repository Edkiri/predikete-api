import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { GroupStage } from './group-stage.entity';
import { Tournament } from './tournaments.entity';

@Entity('tournament_team')
export class Team extends BaseEntity {
  @Exclude()
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament!: Tournament;

  @Exclude()
  @ManyToOne(() => GroupStage, { nullable: true })
  @JoinColumn({ name: 'group_stage_id' })
  groupStage?: GroupStage;

  @ApiModelProperty()
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @ApiModelPropertyOptional()
  @Column({ type: 'varchar', nullable: true })
  image?: string;
}
