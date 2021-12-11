import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';
import { Group } from './group.entity';
import { BaseEntity } from 'src/entities/base.entity';

@Entity()
export class Invitation extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  code: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'issued_by' })
  issuedBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'used_by' })
  usedBy: User;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  used: boolean;
}
