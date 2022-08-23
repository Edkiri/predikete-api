import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from './team.entity';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export abstract class MatchBaseModel extends BaseEntity {
  @ApiModelProperty({ type: () => Team })
  @ManyToOne(() => Team, { nullable: true, eager: true })
  @JoinColumn({ name: 'local_team_id' })
  local?: Team;

  @ApiModelProperty({ type: () => Team })
  @ManyToOne(() => Team, { nullable: true, eager: true })
  @JoinColumn({ name: 'visit_team_id' })
  visit?: Team;

  @ApiModelPropertyOptional()
  @Column({ type: 'int', name: 'goals_local', nullable: true })
  goalsLocal?: number;

  @ApiModelPropertyOptional()
  @Column({ type: 'int', name: 'goals_visit', nullable: true })
  goalsVisit?: number;

  @ApiModelPropertyOptional()
  @Column({ type: 'int', name: 'penals_local', nullable: true })
  penalsLocal?: number;

  @ApiModelPropertyOptional()
  @Column({ type: 'int', name: 'penals_visit', nullable: true })
  penalsVisit?: number;
}
