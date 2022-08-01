import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupStage } from 'src/tournaments/entities/group-stage.entity';
import { Tournament } from 'src/tournaments/entities/tournaments.entity';
import { IGroupStage } from 'src/tournaments/models/group-stage.interface';
import { Repository } from 'typeorm';
import { TeamsSeederService } from '../teams/teams.service';
import { groupStages } from './data';

@Injectable()
export class GroupStagesSeederService {
  constructor(
    @InjectRepository(GroupStage)
    private readonly groupStagesRepo: Repository<GroupStage>,
    private readonly teamsService: TeamsSeederService,
  ) {}

  async getGroupByName(tournament: Tournament, name: string) {
    return this.groupStagesRepo.findOne({
      where: { tournament: { id: tournament.id }, name },
    });
  }

  create(tournament: Tournament): Array<Promise<GroupStage>> {
    return groupStages.map(async (groupStage: IGroupStage) => {
      return await this.groupStagesRepo
        .findOne({ where: { name: groupStage.name, tournament } })
        .then(async (dbGroupStage) => {
          if (dbGroupStage) {
            return Promise.resolve(null);
          }
          groupStage.tournament = tournament;
          const teams = await this.teamsService.getTeamsByName(
            groupStage.teams.map((team) => team.name),
          );
          groupStage.teams = teams;
          const newGroupStage = await this.groupStagesRepo.save(groupStage);
          return newGroupStage;
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
