import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Group } from '../../group/entities/group.entity';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity('group_invitation')
export class GroupInvitation extends BaseEntity {
  @ApiModelProperty({ type: () => User })
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'issued_by_id' })
  issuedBy!: User;

  @ApiModelProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.groupInvitations, { eager: true })
  @JoinColumn({ name: 'issued_to_id' })
  issuedTo!: User;

  @ApiModelProperty({ type: () => Group })
  @ManyToOne(() => Group, { eager: true })
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @ApiModelPropertyOptional()
  @Column({ length: 255, nullable: true })
  message?: string;
}
