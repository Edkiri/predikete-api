import { BaseEntity } from '../../database/entities/base.entity-abstract';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Group } from '../../group/entities/group.entity';
import { Tournament } from '../../tournament/entities/tournaments.entity';
import { User } from '../../user/entities/user.entity';
import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity({ name: 'pool' })
export class Pool extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @ManyToOne(() => Group, (group) => group.pools)
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @Exclude()
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament!: Tournament;

  @ApiModelProperty()
  @Column({ type: 'boolean', default: false })
  completed!: boolean;

  @ApiModelProperty()
  @Column({ type: 'int', default: 0 })
  points!: number;
}
