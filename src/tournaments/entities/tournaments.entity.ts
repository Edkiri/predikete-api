import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/entities/base.entity';

@Entity()
export class Tournament extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'boolean', name: 'is_finished', default: false })
  isFinished: boolean;
}
