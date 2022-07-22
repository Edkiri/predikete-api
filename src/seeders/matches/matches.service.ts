import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/tournaments/entities/match.entity';
import { Tournament } from 'src/tournaments/entities/tournaments.entity';
import { IMatch } from 'src/tournaments/models/match.interface';
import { Repository } from 'typeorm';
import { GroupStagesSeederService } from '../phases/group-stages.service';
import { PhasesSeederService } from '../phases/phases.service';
import { TeamsSeederService } from '../teams/teams.service';
import { final_matches, matches } from './data';

@Injectable()
export class MatchesSeederService {
  constructor(
    @InjectRepository(Match) private readonly matchesRepo: Repository<Match>,
    private readonly teamsService: TeamsSeederService,
    private readonly groupStagesService: GroupStagesSeederService,
    private readonly phasesSeederService: PhasesSeederService,
  ) {}

  create(tournament: Tournament): Array<Promise<Match>> {
    return matches.map(async (match: IMatch) => {
      const local = await this.teamsService.getByName(match.local);
      const visit = await this.teamsService.getByName(match.visit);
      const groupStage = await this.groupStagesService.getGroupByName(
        tournament,
        match.groupStageName,
      );
      const newMatch = this.matchesRepo.create({
        local,
        visit,
        goalsLocal: match.goalsLocal,
        goalsVisit: match.goalsVisit,
        groupStage,
        tournament,
        isDefined: true,
        isFinished: false,
        startAt: match.startAt,
        journey: match.journey,
      });
      return this.matchesRepo.save(newMatch);
    });
  }

  createFinals(tournament: Tournament): Array<Promise<Match>> {
    return final_matches.map(async (match: IMatch) => {
      const phase = await this.phasesSeederService.getFinalPhase(
        tournament,
        match.phase,
      );
      const newMatch = this.matchesRepo.create({
        tournament,
        phase: phase,
        isDefined: false,
        isFinished: false,
        localCondition: match.localCondition || null,
        visitCondition: match.visitCondition || null,
        startAt: match.startAt,
      });
      return this.matchesRepo.save(newMatch);
    });
  }
}
