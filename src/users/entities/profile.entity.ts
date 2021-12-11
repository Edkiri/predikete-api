import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  picture: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
