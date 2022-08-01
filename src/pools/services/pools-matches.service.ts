import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';

import { Match } from 'src/tournaments/entities/match.entity';
import { PhaseOptions } from 'src/tournaments/entities/phase.entity';
import { MatchesService } from 'src/tournaments/services/matches.service';
import { TeamsService } from 'src/tournaments/services/teams.service';
import { UsersService } from 'src/users/services/users.service';
import {
  DataSource,
  IsNull,
  LessThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { PoolMatchDto } from '../dtos/pool-match.dto';
import { PoolMatch } from '../entities/pool-match.entity';
import { Pool } from '../entities/pool.entity';

@Injectable()
export class PoolMatchesService implements OnModuleInit {
  private usersService: UsersService;
  private matchesService: MatchesService;
  constructor(
    @InjectRepository(PoolMatch)
    private readonly poolMatchesRepo: Repository<PoolMatch>,
    private readonly teamsServices: TeamsService,
    private readonly moduleRef: ModuleRef,
    private readonly dataSoruce: DataSource,
  ) {}

  onModuleInit() {
    this.usersService = this.moduleRef.get(UsersService, {
      strict: false,
    });
    this.matchesService = this.moduleRef.get(MatchesService, {
      strict: false,
    });
  }

  async findOne(id: number) {
    const poolMatch = await this.poolMatchesRepo.findOne({
      where: { id },
      relations: {
        local: true,
        visit: true,
        match: {
          local: true,
          visit: true,
        },
      },
    });
    return poolMatch;
  }

  async belongsToPool(id: number, poolId: number) {
    const poolMatch = await this.poolMatchesRepo.findOne({
      where: { id, pool: { id: poolId } },
      relations: {
        pool: true,
      },
    });
    return poolMatch;
  }

  async listGSPoolMatches(poolId: number) {
    const GSpoolMatches = await this.dataSoruce.getRepository(PoolMatch).find({
      where: { pool: { id: poolId }, match: { localCondition: IsNull() } },
      relations: {
        local: true,
        visit: true,
        match: {
          groupStage: {
            teams: true,
          },
          local: true,
          visit: true,
        },
      },
    });
    return GSpoolMatches;
  }

  async listFPPoolMatches(poolId: number) {
    const FPspoolMatches = await this.poolMatchesRepo.find({
      where: {
        pool: { id: poolId },
        match: { localCondition: Not(IsNull()) },
      },
      relations: {
        local: true,
        visit: true,
        match: {
          local: true,
          visit: true,
          phase: true,
        },
      },
    });
    return FPspoolMatches;
  }

  async initializePoolMatches(pool: Pool) {
    const matches = await this.matchesService.findByTournament(pool.tournament);
    matches.map(async (match: Match) => {
      const newPoolMatch = await this.createPoolMatch(pool, match);
      return newPoolMatch;
    });
  }

  async createPoolMatch(pool: Pool, match: Match) {
    const newPoolMatch = this.poolMatchesRepo.create({
      pool,
      match,
    });
    newPoolMatch.local = match.local;
    newPoolMatch.visit = match.visit;
    const poolMatch = await this.poolMatchesRepo.save(newPoolMatch);
    return poolMatch;
  }

  async getPoolMatchDetails(groupId: number, poolMatchId: number) {
    const poolMatch = await this.poolMatchesRepo.findOne({
      where: { id: poolMatchId },
      relations: {
        match: true,
      },
    });
    const poolMatches = await this.poolMatchesRepo.find({
      where: {
        pool: {
          membership: { group: { id: groupId } },
        },
        match: { id: poolMatch.match.id },
      },
      relations: {
        pool: {
          membership: {
            group: true,
            user: {
              profile: true,
            },
          },
        },
        match: {
          local: true,
          visit: true,
        },
        local: true,
        visit: true,
      },
    });
    return poolMatches;
  }

  calculatePoolMatchPoints(poolMatch: PoolMatch) {
    let points = 0;
    const { match } = poolMatch;
    if (match.isDefined && match.isFinished && poolMatch.isPredicted) {
      const exactResult =
        poolMatch.local.id === match.local.id &&
        poolMatch.visit.id === match.visit.id &&
        poolMatch.goalsLocal === match.goalsLocal &&
        poolMatch.goalsVisit === match.goalsVisit;
      if (exactResult) {
        points += 5;
      }

      const winningPoolTeam = this.matchesService.getWinnerTeam(poolMatch);
      const winningMatchTeam = this.matchesService.getWinnerTeam(match);
      if (
        !exactResult &&
        winningPoolTeam &&
        winningMatchTeam &&
        match.phase?.phase !== PhaseOptions.FINAL
      ) {
        if (winningPoolTeam.id === winningMatchTeam.id) {
          points += 3;
        }
      }
      if (
        !exactResult &&
        !winningPoolTeam &&
        !winningMatchTeam &&
        poolMatch.goalsLocal !== null
      ) {
        points += 1;
        return points;
      }
      if (match.phase) {
        const loosingPoolTeam = this.matchesService.getLoosingTeam(poolMatch);
        const loosingMatchTeam = this.matchesService.getLoosingTeam(match);
        if (
          poolMatch.local.id === match.local.id ||
          poolMatch.local.id === match.visit.id
        ) {
          points += 1;
        }
        if (
          poolMatch.visit.id === match.local.id ||
          poolMatch.visit.id === match.visit.id
        ) {
          points += 1;
        }
        if (match.phase.phase === PhaseOptions.FINAL) {
          if (winningPoolTeam.id === winningMatchTeam.id) {
            points += 15;
          }
          if (loosingPoolTeam.id === loosingMatchTeam.id) {
            points += 10;
          }
        }
      }
    }
    return points;
  }

  async updatePoolMatch(poolId: number, changes: PoolMatchDto) {
    const poolMatch = await this.findOne(changes.poolMatchId);
    this.poolMatchesRepo.merge(poolMatch, changes);
    if (changes.localId) {
      const localTeam = await this.teamsServices.findOne(changes.localId);
      poolMatch.local = localTeam;
    }
    if (changes.visitId) {
      const visitTeam = await this.teamsServices.findOne(changes.visitId);
      poolMatch.visit = visitTeam;
    }
    poolMatch.isPredicted = true;
    await this.poolMatchesRepo.save(poolMatch);
  }

  async findNextMatch(pool: Pool) {
    const poolMatches = await this.poolMatchesRepo.find({
      where: {
        pool: { id: pool.id },
        match: { startAt: MoreThanOrEqual(new Date()) },
      },
      relations: {
        local: true,
        visit: true,
        match: {
          local: true,
          visit: true,
          groupStage: true,
          phase: true,
        },
      },
    });
    const nextPoolMatch = poolMatches.sort((a, b) => {
      return a.match.startAt.getTime() - b.match.startAt.getTime();
    })[0];
    return nextPoolMatch;
  }

  async findPreviusMatch(pool: Pool) {
    const poolMatches = await this.poolMatchesRepo.find({
      where: {
        pool: { id: pool.id },
        match: { startAt: LessThan(new Date()) },
      },
      relations: {
        local: true,
        visit: true,
        match: {
          local: true,
          visit: true,
          groupStage: true,
          phase: true,
        },
      },
    });
    const previusPoolMatch = poolMatches.sort((a, b) => {
      return b.match.startAt.getTime() - a.match.startAt.getTime();
    })[0];
    return previusPoolMatch;
  }

  async getPoolMatchesByMatch(match: Match) {
    const poolMatches = await this.poolMatchesRepo.find({
      where: { match: { id: match.id }, isCalculated: false },
      relations: {
        pool: true,
        local: true,
        visit: true,
        match: {
          local: true,
          visit: true,
          phase: true,
        },
      },
    });

    return poolMatches;
  }

  async savePoolMatchesPoints(poolMatches: PoolMatch[]) {
    for await (const poolMatch of poolMatches) {
      const points = this.calculatePoolMatchPoints(poolMatch);
      poolMatch.points = points;
      poolMatch.isCalculated = true;
      await this.poolMatchesRepo.save(poolMatch);
    }
  }
}
