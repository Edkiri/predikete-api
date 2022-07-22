import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity('memberships')
export class Membership extends BaseEntity {
  @ManyToOne(() => User, (user) => user.memberships)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Group, (group) => group.memberships)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ type: 'boolean', default: false })
  is_admin: boolean;
}
