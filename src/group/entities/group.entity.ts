import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Membership } from './membership.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'group' })
export class Group extends BaseEntity {
  @ApiModelProperty()
  @Column()
  name!: string;

  @ApiModelPropertyOptional()
  @Column({ nullable: true, length: 100 })
  about?: string;

  @Exclude()
  @OneToMany(() => Membership, (membership) => membership.group)
  memberships!: Membership[];

  @ApiModelPropertyOptional()
  @Column({ type: 'varchar', length: 255, nullable: true })
  picture?: string;
}
