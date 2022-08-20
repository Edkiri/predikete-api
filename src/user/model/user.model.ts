import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../database/model/base.model-abstract';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Profile } from './profile.model';
import { Role } from './role.enum';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @ApiHideProperty()
  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @ApiModelProperty()
  @Column({ type: 'varchar', length: 255, unique: true })
  username!: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Exclude()
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
}
