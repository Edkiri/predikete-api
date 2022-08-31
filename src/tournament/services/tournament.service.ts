import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';
import { Repository } from 'typeorm';

import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { Tournament } from '../entities';
import { GroupStageService } from './group-stage.service';
import { TeamService } from './team.service';
import { MatchService } from './match.service';

@Injectable()
export class TournamentService extends TransactionFor<TournamentService> {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    private readonly teamService: TeamService,
    private readonly groupStageService: GroupStageService,
    private readonly matchService: MatchService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async findOne(tournamentId: number): Promise<Tournament | null> {
    return this.tournamentRepository.findOne({ where: { id: tournamentId } });
  }

  async create(data: CreateTournamentDto): Promise<Tournament | null> {
    const oldTournament = await this.tournamentRepository.findOne({
      where: { name: data.tournament.name },
    });
    if (oldTournament) throw new Error('Tournament already exists.');
    const tournament = await this.tournamentRepository.save(data.tournament);
    await this.groupStageService.createMany(data.groupStages, tournament);
    await this.teamService.createMany(data.teams, tournament);
    await this.matchService.createMany(data.matches, tournament);
    return tournament;
  }
}
