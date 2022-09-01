import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { Tournament } from '../entities/tournaments.entity';
import { ITeam } from '../interfaces/tournament.interface';
import { GroupStageService } from './group-stage.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly groupStageService: GroupStageService,
  ) {}

  async createMany(data: ITeam[], tournament: Tournament): Promise<Team[]> {
    const teamPromises = data.map(async (team: ITeam) => {
      const oldTeam = await this.teamRepository.findOne({
        where: { name: team.name },
      });
      if (oldTeam) return;
      const newTeam = this.teamRepository.create({ ...team });
      const groupStage = await this.groupStageService.findOneByName(
        team.groupStageName,
      );
      newTeam.tournament = tournament;
      newTeam.groupStage = groupStage;
      return this.teamRepository.save(newTeam);
    });
    return Promise.all(teamPromises);
  }

  async findOneById(teamId: number) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
    });
    if (!team) {
      throw new NotFoundException(`Not found team with id '${teamId}'.`);
    }
    return team;
  }

  async findOneByName(name: string): Promise<Team | null> {
    if (name) {
      return this.teamRepository.findOne({ where: { name } });
    }
    return null;
  }
}
