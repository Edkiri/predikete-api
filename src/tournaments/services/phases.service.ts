import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from '../entities/phase.entity';
import { MatchesService } from './matches.service';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private readonly phasesRepo: Repository<Phase>,
    private readonly matchesService: MatchesService,
  ) {}

  async findOne(id: number) {
    const phase = this.phasesRepo.findOne(id);
    if (!phase) {
      throw new NotFoundException(`Phase #${id} not found`);
    }
    return phase;
  }

  async getPhaseStats(tournamentId: number, phaseId: number) {
    return this.phasesRepo.find({
      where: { id: phaseId, tournament: tournamentId },
    });
  }

  async getMatches(tournamentId: number) {
    return this.matchesService.getFinalsMatches(tournamentId);
  }
}
