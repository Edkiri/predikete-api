import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Group } from './group.entity';
import { BaseEntity } from 'src/entities/base.entity';

@Entity('invitations')
export class Invitation extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'issued_by' })
  issuedBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'issued_to' })
  issuedTo: User;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column({ type: 'text', nullable: true })
  message: string;
}
