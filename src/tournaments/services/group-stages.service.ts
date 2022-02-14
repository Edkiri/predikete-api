import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupStage } from '../entities/group-stage.entity';
import { Match } from '../entities/match.entity';
import { IGroupStageStats } from '../models/stats.interdace';
import { MatchesService } from './matches.service';

@Injectable()
export class GroupStagesService {
  constructor(
    @InjectRepository(GroupStage)
    private readonly groupStagesRepo: Repository<GroupStage>,
    private readonly matchesService: MatchesService,
  ) {}

  async findOne(id: number) {
    const groupStage = this.groupStagesRepo.findOne(id);
    if (!groupStage) {
      throw new NotFoundException(`Group #${id} not found`);
    }
    return groupStage;
  }

  async findByName(tournamentId: number, name: string) {
    const groupStage = this.groupStagesRepo.findOne({
      where: { tournament: tournamentId, name: name.toUpperCase() },
      relations: ['teams'],
    });
    if (!groupStage) {
      throw new NotFoundException(`Group '${name}' not found`);
    }
    return groupStage;
  }

  async getGroupStats(
    tournamentId: number,
    groupName: string,
  ): Promise<IGroupStageStats> {
    const groupStage = await this.findByName(tournamentId, groupName);

    const stats = await this.matchesService.getGroupStageStats(groupStage);
    return {
      name: groupStage.name,
      stats: stats,
    };
  }

  async getGroupMatches(tournamentId: number, name: string): Promise<Match[]> {
    const groupStage = await this.findByName(tournamentId, name);
    const matches = await this.matchesService.getMatchesByGroupStage(
      groupStage,
    );

    return matches;
  }
}
