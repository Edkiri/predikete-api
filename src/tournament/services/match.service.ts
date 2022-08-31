import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
import { Tournament } from '../entities/tournaments.entity';
import { IMatch } from '../interfaces/tournament.interface';
import { GroupStageService } from './group-stage.service';
import { TeamService } from './team.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private readonly groupStageService: GroupStageService,
    private readonly teamService: TeamService,
  ) {}

  async createMany(data: IMatch[], tournament: Tournament): Promise<Match[]> {
    const matchesPromises = data.map(async (match: IMatch) => {
      const groupStage = await this.groupStageService.findOneByName(
        match.groupStageName,
      );
      const local = await this.teamService.findOneByName(match.local);
      const visit = await this.teamService.findOneByName(match.visit);
      const data = {
        local: local ? local : null,
        visit: visit ? visit : null,
        groupStage: groupStage ? groupStage : null,
      };
      console.log('data', data);
      const newMatch = this.matchRepository.create({
        ...match,
        ...data,
        tournament,
      });
      return this.matchRepository.save(newMatch);
    });
    return Promise.all(matchesPromises);
  }

  async findByTournament(tournament: Tournament) {
    const matches = await this.matchRepository.find({
      where: { tournament: { id: tournament.id } },
    });
    if (!matches.length) {
      throw new Error(
        `No match found by tournament with id '${tournament.id}'`,
      );
    }
    return matches;
  }
}
