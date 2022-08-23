import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../database/entities/base.entity-abstract';

@Entity('tournament_team')
export class Team extends BaseEntity {
  @ApiModelProperty()
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @ApiModelPropertyOptional()
  @Column({ type: 'varchar', nullable: true })
  image?: string;
}
