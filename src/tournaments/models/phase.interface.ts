import { PhaseOptions } from '../entities/phase.entity';
import { ITournament } from './tournament.interface';

export interface IPhase {
  tournament: ITournament;
  phase: PhaseOptions;
  name?: string;
}
