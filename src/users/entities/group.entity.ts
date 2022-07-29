import { BaseEntity } from '../../database/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Membership } from './membership.entity';

@Entity('groups')
export class Group extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @OneToMany(() => Membership, (membership) => membership.group)
  memberships: Membership[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  picture: string;
}
