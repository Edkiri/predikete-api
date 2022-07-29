import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/tournaments/entities/team.entity';
import { ITeam } from 'src/tournaments/models/team.interface';
import { In, Repository } from 'typeorm';
import { teams } from './data';

@Injectable()
export class TeamsSeederService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
  ) {}

  async getByName(name: string): Promise<Team> {
    const team = this.teamRepo.findOne({ where: { name } });
    if (!team) {
      throw new NotFoundException(`Team '${name}' not found`);
    }
    return team;
  }

  async getTeamsByName(teamNames: string[]): Promise<Team[]> {
    const teams = await this.teamRepo.find({ where: { name: In(teamNames) } });
    return teams;
  }

  create(): Array<Promise<Team>> {
    return teams.map(async (team: ITeam) => {
      return await this.teamRepo
        .findOne({ where: { name: team.name } })
        .then(async (dbTeam) => {
          if (dbTeam) {
            return Promise.resolve(null);
          }
          return this.teamRepo.save(team);
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
