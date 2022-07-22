import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Profile } from './profile.entity';
import { Membership } from './membership.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { Role } from '../models/role.model';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Exclude()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: Role;

  @OneToOne(() => Profile, (profile) => profile.user, { nullable: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];
}
