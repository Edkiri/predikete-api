import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { GroupStage } from './group-stage.entity';
// import { Phase } from './phase.entity';
import { Tournament } from './tournaments.entity';
import { MatchBaseModel } from './match.entity-abs';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { PhaseOptions } from '../interfaces/phase.enum';

@Entity('tournament_match')
export class Match extends MatchBaseModel {
  @Exclude()
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament!: Tournament;

  @ApiModelPropertyOptional({
    enum: [PhaseOptions],
    enumName: 'PhaseOptions',
    default: PhaseOptions.GROUP_STAGE,
  })
  @Column({
    type: 'enum',
    enum: PhaseOptions,
    enumName: 'PhaseOptions',
    default: PhaseOptions.GROUP_STAGE,
  })
  @Index()
  phase?: PhaseOptions;

  @Exclude()
  @ManyToOne(() => GroupStage, (groupStage) => groupStage.matches, {
    nullable: true,
  })
  @JoinColumn({ name: 'group_stage_id' })
  groupStage?: GroupStage;

  @Exclude()
  @Column({
    type: 'boolean',
    name: 'is_defined',
    default: false,
  })
  isDefined!: boolean;

  @ApiModelProperty()
  @Column({
    type: 'boolean',
    name: 'is_finished',
    default: false,
  })
  isFinished!: boolean;

  @ApiModelProperty({ type: () => Date })
  @Column({ type: 'timestamp', name: 'start_at' })
  startAt!: Date;

  @ApiModelPropertyOptional()
  @Column({
    name: 'local_condition',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  localCondition?: string;

  @ApiModelPropertyOptional()
  @Column({
    name: 'visit_condition',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  visitCondition?: string;

  @ApiModelPropertyOptional()
  @Column({
    type: 'smallint',
    nullable: true,
  })
  journey?: number;
}
