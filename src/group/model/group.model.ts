import { BaseEntity } from '../../database/model/base.model-abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Membership } from './membership.model';

@Entity({ name: 'group' })
export class Group extends BaseEntity {
  @ApiModelProperty()
  @Column({ unique: true })
  name!: string;

  @ApiModelPropertyOptional()
  @Column({ type: 'text', nullable: true })
  about?: string;

  @ApiModelProperty()
  @OneToMany(() => Membership, (membership) => membership.group)
  memberships!: Membership[];

  @ApiModelPropertyOptional()
  @Column({ type: 'varchar', length: 255, nullable: true })
  picture?: string;
}
