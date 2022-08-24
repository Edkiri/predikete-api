import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Profile } from './profile.entity';
import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Membership } from '../../membership/entities/membership.entity';
import { GroupInvitation } from '../../membership/entities/group-invitation.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @ApiProperty()
  @Column({ name: 'display_name', type: 'varchar', length: 20 })
  displayName!: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Exclude()
  @ApiProperty({ enum: Role, enumName: 'Role', default: Role.CLIENT })
  @Column({
    type: 'enum',
    enumName: 'Role',
    enum: Role,
    default: Role.CLIENT,
  })
  role!: Role;

  @ApiModelPropertyOptional({
    type: () => Profile,
  })
  @OneToOne(() => Profile, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  profile!: Profile;

  @Exclude()
  @OneToMany(() => Membership, (membership) => membership.user, {
    onDelete: 'CASCADE',
  })
  memberships?: Membership[];

  @Exclude()
  @OneToMany(
    () => GroupInvitation,
    (groupInvitation) => groupInvitation.issuedTo,
    {
      onDelete: 'CASCADE',
    },
  )
  groupInvitations?: GroupInvitation[];
}
