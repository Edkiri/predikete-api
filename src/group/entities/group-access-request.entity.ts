import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { User } from '../../user/entities/user.entity';
import { Group } from './group.entity';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity('group_access_request')
export class GroupAccessRequest extends BaseEntity {
  @ApiModelProperty({ type: () => User })
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'issued_by' })
  issuedBy!: User;

  @ApiModelProperty({ type: () => Group })
  @ManyToOne(() => Group, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @ApiModelPropertyOptional()
  @Column({ nullable: true, length: 255 })
  message?: string;
}
