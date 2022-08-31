import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IPool } from '../interfaces';
import { Pool, PoolMatch } from '../entities';
import { PoolMatchService } from './pool-match.service';
import { TournamentService } from 'src/tournament/services';

@Injectable()
export class PoolService {
  constructor(
    @InjectRepository(Pool) private readonly poolRepository: Repository<Pool>,
    private readonly poolMatchService: PoolMatchService,
    private readonly tournamentService: TournamentService,
  ) {}

  async create(data: IPool) {
    const oldPool = await this.poolRepository.findOne({ where: { ...data } });
    if (oldPool) {
      throw new Error(
        `User with id '${oldPool.owner.id}' already have a pool in group with id '${oldPool.group}' and tournament '${oldPool.tournament.id}'`,
      );
    }
    // TODO: Fix this to enable future tournaments.
    const qatarTournament = await this.tournamentService.findOne(1);
    const pool = await this.poolRepository.save({
      tournament: qatarTournament,
      ...data,
    });
    await this.poolMatchService.createInitialMatches(pool);
    return pool;
  }

  async findOneById(poolId: number) {
    const pool = await this.poolRepository.findOne({
      where: { id: poolId },
    });
    if (!pool) {
      throw new HttpException(`Not found pool with id '${poolId}'.`, 404);
    }
    return pool;
  }

  async findPoolMatchesByPoolId(poolId: number): Promise<PoolMatch[]> {
    const pool = await this.findOneById(poolId);
    return this.poolMatchService.findPoolMatches(pool);
  }

  async findByGroupId(groupId: number) {
    return this.poolRepository.find({
      where: { group: { id: groupId } },
    });
  }
}
