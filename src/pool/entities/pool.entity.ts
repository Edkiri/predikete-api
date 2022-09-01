import { BaseEntity } from '../../database/entities/base.entity-abstract';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Group } from '../../group/entities/group.entity';
import { Tournament } from '../../tournament/entities/tournaments.entity';
import { User } from '../../user/entities/user.entity';
import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { PoolMatch } from './pool-match.entity';

@Entity({ name: 'pool' })
export class Pool extends BaseEntity {
  @Exclude()
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @ApiModelProperty()
  @RelationId((pool: Pool) => pool.owner)
  ownerId!: number;

  @Exclude()
  @ManyToOne(() => Group, (group) => group.pools)
  @JoinColumn({ name: 'group_id' })
  group!: Group;

  @ApiModelProperty()
  @RelationId((pool: Pool) => pool.group)
  groupId!: number;

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

  @Exclude()
  @OneToMany(() => PoolMatch, (poolMatch) => poolMatch.pool)
  poolMatches!: PoolMatch[];
}
