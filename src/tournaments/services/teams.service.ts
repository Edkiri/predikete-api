import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamsRepo: Repository<Team>,
  ) {}

  async findOne(id: number) {
    const team = await this.teamsRepo.findOne(id);
    if (!team) {
      throw new NotFoundException(`Team #${id} not found`);
    }
    return team;
  }
}
