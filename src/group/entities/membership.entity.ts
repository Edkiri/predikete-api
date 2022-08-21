import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Group } from './group.entity';
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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'membership' })
export class Membership extends BaseEntity {
  @ApiModelProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.memberships, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Exclude()
  @ManyToOne(() => Group, (group) => group.memberships)
  @Index()
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @RelationId((membership: Membership) => membership.group)
  @ApiProperty()
  groupId!: number;

  @ApiModelProperty()
  @Column({ name: 'is_admin', type: 'boolean', default: false })
  isAdmin: boolean;
}
