import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IPhase } from '../models/phase.interface';
import { Match } from './match.entity';
import { Tournament } from './tournaments.entity';

export enum PhaseOptions {
  SIXTEENTHS_FINAL = 'sixteenths final',
  EIGHTH_FINAL = 'eighth final',
  QUARTERS_FINAL = 'quarters final',
  SEMI_FINAL = 'semi final',
  THITD_AND_FOURTH = 'third and fourth',
  FINAL = 'final',
}

@Entity('phases')
export class Phase extends BaseEntity implements IPhase {
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column({
    type: 'enum',
    enum: PhaseOptions,
  })
  phase: PhaseOptions;

  @OneToMany(() => Match, (match) => match.phase, { nullable: true })
  matches: Match[];
}
