import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseEntity } from '../../database/model/base.model-abstract';
import { Group } from './group.model';
import { User } from '../../user/model/user.model';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'membership' })
export class Membership extends BaseEntity {
  @ApiModelProperty()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiModelProperty()
  @ManyToOne(() => Group, (group) => group.memberships)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ApiModelProperty()
  @Column({ name: 'is_admin', type: 'boolean', default: false })
  isAdmin: boolean;
}
