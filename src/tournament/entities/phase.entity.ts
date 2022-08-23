import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity-abstract';
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

@Entity('tournament_phase')
export class Phase extends BaseEntity {
  @ApiModelProperty()
  @ManyToOne(() => Tournament)
  @JoinColumn({ name: 'tournament_id' })
  tournament!: Tournament;

  @ApiModelProperty({
    enum: [PhaseOptions],
    enumName: 'PhaseOptions',
    default: PhaseOptions.EIGHTH_FINAL,
  })
  @Column({
    type: 'enum',
    enum: PhaseOptions,
    enumName: 'PhaseOptions',
    default: PhaseOptions.EIGHTH_FINAL,
  })
  phase!: PhaseOptions;

  @Exclude()
  @OneToMany(() => Match, (match) => match.phase, { nullable: true })
  matches?: Match[];
}
