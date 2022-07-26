import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/tournaments/entities/match.entity';
import { MatchesService } from 'src/tournaments/services/matches.service';
import { TournamentsService } from 'src/tournaments/services/tournaments.service';
import { Membership } from 'src/users/entities/membership.entity';
import { MembershipsService } from 'src/users/services/memberships.service';
import { Repository } from 'typeorm';
import { UpdatePoolMatchDto } from '../dtos/pool-match.dto';
import { Pool } from '../entities/pool.entity';
import { PoolMatchesService } from './pools-matches.service';

@Injectable()
export class PoolsService implements OnModuleInit {
  private membershipsService: MembershipsService;
  private matchesService: MatchesService;
  constructor(
    @InjectRepository(Pool) private readonly poolsRepo: Repository<Pool>,
    private readonly moduleRef: ModuleRef,
    private readonly tournamentsService: TournamentsService,
    private readonly poolMatchesService: PoolMatchesService,
  ) {}

  onModuleInit() {
    this.membershipsService = this.moduleRef.get(MembershipsService, {
      strict: false,
    });
    this.matchesService = this.moduleRef.get(MatchesService, {
      strict: false,
    });
  }

  async findOne(id: number) {
    const pool = this.poolsRepo.findOne({
      where: { id },
      relations: [
        'membership',
        'membership.user',
        'membership.group',
        'tournament',
        'tournament.teams',
      ],
    });
    if (!pool) {
      throw new NotFoundException(`Pool #${id} not found`);
    }
    return pool;
  }

  async countActivePoolsByGroup(membership: Membership): Promise<number> {
    const pools = await this.poolsRepo.find({
      relations: ['membership', 'membership.group'],
      where: { membership: { group: { id: membership.group.id } } },
    });
    return pools.length;
  }

  async create(membership: Membership) {
    const tournament = await this.tournamentsService.findOne(1);
    const newPool = await this.poolsRepo.save({
      tournament,
      membership,
    });
    this.poolMatchesService.initializePoolMatches(newPool);
    return newPool;
  }

  async getPoolDetails(groupId: number, userId: number) {
    const pool = await this.poolsRepo.findOne({
      where: {
        membership: { user: { id: userId }, group: { id: groupId } },
      },
      relations: [
        'membership',
        'membership.group',
        'membership.user',
        'membership.user.profile',
        'membership.group.memberships',
        'membership.group.memberships.user',
        'tournament',
        'tournament.groupStages',
        'tournament.groupStages.teams',
        'tournament.teams',
      ],
    });
    if (!pool) {
      throw new NotFoundException(`Pool not found`);
    }
    return pool;
  }

  async updateMatches(poolId: number, data: UpdatePoolMatchDto) {
    const pool = await this.poolsRepo.findOne({
      where: { id: poolId },
    });
    for await (const changes of data.poolMatches) {
      await this.poolMatchesService.updatePoolMatch(poolId, changes);
    }
    pool.completed = true;
    await this.poolsRepo.save(pool);
    return {
      message: 'Pool Matches successfuly updated',
    };
  }

  async getNextMatch(poolId: number) {
    const pool = await this.findOne(poolId);
    return this.poolMatchesService.findNextMatch(pool);
  }

  async getPreviusMatch(poolId: number) {
    const pool = await this.findOne(poolId);
    return this.poolMatchesService.findPreviusMatch(pool);
  }

  async findByGroupId(groupId: number) {
    return this.poolsRepo.find({
      where: { membership: { group: { id: groupId } } },
      relations: [
        'membership',
        'membership.group',
        'membership.user',
        'membership.user.profile',
      ],
      order: { points: 'DESC' },
    });
  }

  async findTopMembers(groupId: number) {
    const pools = await this.findByGroupId(groupId);
    return pools.slice(0, 3);
  }

  async findAllMembers(groupId: number) {
    return this.findByGroupId(groupId);
  }

  async calculatePoints(match: Match) {
    const poolMatches = await this.poolMatchesService.getPoolMatchesByMatch(
      match,
    );
    await this.poolMatchesService.savePoolMatchesPoints(poolMatches);
    for (const poolMatch of poolMatches) {
      const points =
        this.poolMatchesService.calculatePoolMatchPoints(poolMatch);
      poolMatch.pool.points = poolMatch.pool.points + points;
      await this.poolsRepo.save(poolMatch.pool);
    }
  }
}
