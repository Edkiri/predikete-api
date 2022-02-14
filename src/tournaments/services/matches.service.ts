import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMatchDto } from '../dtos/matches.dto';
import { GroupStage } from '../entities/group-stage.entity';
import { Match } from '../entities/match.entity';
import { IStats } from '../models/stats.interdace';
import { TeamsService } from './teams.service';
import { TournamentsService } from './tournaments.service';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private readonly matchesRepo: Repository<Match>,
    private readonly tournametsService: TournamentsService,
    private readonly teamsServices: TeamsService,
  ) {}

  async findOne(id: number) {
    const match = await this.matchesRepo.findOne(id);
    if (!match) {
      throw new NotFoundException(`Match #${id} not found`);
    }
    return match;
  }

  async getMatchesByGroupStage(groupStage: GroupStage) {
    return this.matchesRepo.find({
      where: { groupStage },
      relations: ['local', 'visit'],
    });
  }
  async getFinalsMatches(tournamentId: number) {
    const tournament = await this.tournametsService.findOne(tournamentId);
    const matches = await this.matchesRepo.find({
      where: { tournament, groupStage: null },
      relations: ['local', 'visit', 'phase'],
    });
    return matches;
  }

  async getGroupStageStats(groupStage: GroupStage): Promise<IStats[]> {
    const matches = await this.matchesRepo.find({
      where: { groupStage },
      relations: ['local', 'visit'],
    });
    const stats: IStats[] = groupStage.teams.map((team) => {
      return {
        teamName: team.name,
        played: 0,
        points: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        goalsScored: 0,
        goalsReceived: 0,
      };
    });
    matches.forEach((match) => {
      this.calculateMatchStats(match, stats);
    });
    return stats;
  }

  private calculateMatchStats(match: Match, stats: IStats[]): void {
    if (match.isFinished) {
      const local = match.local;
      const visit = match.visit;
      const statsLocal = stats.find((item) => item.teamName === local.name);
      const statsVisit = stats.find((item) => item.teamName === visit.name);
      // Played
      statsLocal.played += 1;
      statsVisit.played += 1;
      // Local Goals
      statsLocal.goalsReceived += match.goalsVisit;
      statsLocal.goalsScored += match.goalsLocal;
      // Visit Goals
      statsVisit.goalsReceived += match.goalsLocal;
      statsVisit.goalsScored += match.goalsVisit;
      // Calculate Points
      if (match.goalsLocal > match.goalsVisit) {
        statsLocal.wins += 1;
        statsLocal.points += 3;
        statsVisit.losses += 1;
      } else if (match.goalsLocal < match.goalsVisit) {
        statsVisit.wins += 1;
        statsVisit.points += 3;
        statsLocal.losses += 1;
      } else {
        statsLocal.ties += 1;
        statsLocal.points += 1;
        statsVisit.ties += 1;
        statsVisit.points += 1;
      }
    }
  }

  async update(id: number, changes: UpdateMatchDto) {
    const match = await this.findOne(id);
    this.matchesRepo.merge(match, changes);
    if (changes.localId) {
      const localTeam = await this.teamsServices.findOne(changes.localId);
      match.local = localTeam;
    }
    if (changes.visitId) {
      const visitTeam = await this.teamsServices.findOne(changes.visitId);
      match.visit = visitTeam;
    }
    return this.matchesRepo.save(match);
  }
}
