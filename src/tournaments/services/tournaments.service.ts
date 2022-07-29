import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTournamentDto } from '../dtos/tournament.dto';
import { Tournament } from '../entities/tournaments.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentsRepo: Repository<Tournament>,
  ) {}

  async find() {
    return this.tournamentsRepo.find();
  }

  async findOne(id: number) {
    const tournament = await this.tournamentsRepo.findOne({ where: { id } });
    if (!tournament) {
      throw new NotFoundException(`Tournament #${id} not found`);
    }
    return tournament;
  }

  async update(id: number, changes: UpdateTournamentDto) {
    const tournament = await this.findOne(id);
    this.tournamentsRepo.merge(tournament, changes);
    return this.tournamentsRepo.save(tournament);
  }
}
