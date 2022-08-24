import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Group } from '../../group/entities/group.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Index,
  RelationId,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'group_membership' })
export class Membership extends BaseEntity {
  @ApiModelProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.memberships, {
    eager: true,
  })
  @Index()
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Exclude()
  @ManyToOne(() => Group, (group) => group.memberships, { eager: true })
  @Index()
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @RelationId((membership: Membership) => membership.group)
  @ApiModelProperty()
  groupId!: number;

  @ApiModelProperty()
  @Column({ name: 'is_admin', type: 'boolean', default: false })
  isAdmin: boolean;
}
