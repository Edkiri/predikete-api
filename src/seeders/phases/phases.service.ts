import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phase, PhaseOptions } from 'src/tournaments/entities/phase.entity';
import { Tournament } from 'src/tournaments/entities/tournaments.entity';
import { IPhase } from 'src/tournaments/models/phase.interface';
import { Repository } from 'typeorm';
import { phases } from './data';

@Injectable()
export class PhasesSeederService {
  constructor(
    @InjectRepository(Phase)
    private readonly phasesRepo: Repository<Phase>,
  ) {}

  async getFinalPhase(tournament: Tournament, phaseOption: PhaseOptions) {
    const phase = await this.phasesRepo.findOne({
      tournament,
      phase: phaseOption,
    });
    return phase;
  }

  async findByOption(option: PhaseOptions) {
    return this.phasesRepo.findOne({ phase: option });
  }

  create(tournament: Tournament): Array<Promise<Phase>> {
    return phases.map(async (phase: IPhase) => {
      return await this.phasesRepo
        .findOne({ tournament: tournament })
        .then(async (dbPhase) => {
          if (dbPhase) {
            return Promise.resolve(null);
          }
          phase.tournament = tournament;
          const newPhase = await this.phasesRepo.save(phase);
          return newPhase;
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
