import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { User } from './user.entity';

@Entity({ name: 'user_profile' })
export class Profile extends BaseEntity {
  @ApiModelPropertyOptional()
  @Column({ type: 'varchar', length: 255, nullable: true })
  picture?: string;

  @OneToOne(() => User, (user) => user.profile, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user!: User;
}
