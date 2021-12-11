import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/entities/base.entity';
import { ITeam } from '../models/team.interface';

@Entity()
export class Team extends BaseEntity implements ITeam {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;
}
