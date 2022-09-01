import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';
import { Match } from 'src/tournament/entities/match.entity';
import { TeamService } from 'src/tournament/services';
import { MatchService } from 'src/tournament/services/match.service';
import { Repository } from 'typeorm';
import { UpdatePoolMatchesDto } from '../dto';
import { PoolMatchDto } from '../dto/pool-match.dto';
import { Pool, PoolMatch } from '../entities';

@Injectable()
export class PoolMatchService extends TransactionFor<PoolMatchService> {
  constructor(
    @InjectRepository(PoolMatch)
    private readonly poolMatchRepository: Repository<PoolMatch>,
    private readonly tournamentMatchService: MatchService,
    private readonly teamService: TeamService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async createInitialMatches(pool: Pool): Promise<PoolMatch[]> {
    const tournamentMatches =
      await this.tournamentMatchService.findByTournament(pool.tournament);
    const poolMachesPromises = tournamentMatches.map(
      async (tournamentMatch: Match) => {
        try {
          const newPoolMatch = this.poolMatchRepository.create({
            pool,
            tournamentMatch,
          });
          newPoolMatch.local = tournamentMatch.local;
          newPoolMatch.visit = tournamentMatch.visit;
          return this.poolMatchRepository.save(newPoolMatch);
        } catch (err) {
          throw new Error(
            `Error while creating initial pool matches in pool with id '${pool.id}'`,
          );
        }
      },
    );
    const poolMatches = await Promise.all(poolMachesPromises);
    if (poolMatches.length !== tournamentMatches.length) {
      throw new Error('Error creating pool matches.');
    }
    return poolMatches;
  }

  async findOne(poolMatchId: number) {
    const poolMatch = await this.poolMatchRepository.findOne({
      where: { id: poolMatchId },
    });
    if (!poolMatch) {
      throw new NotFoundException(
        `Not found pool match with id '${poolMatchId}'.`,
      );
    }
    return poolMatch;
  }

  async findPoolMatches(pool: Pool) {
    return this.poolMatchRepository.find({
      where: { pool: { id: pool.id } },
    });
  }

  async updateAllPoolMatches(poolId: number, data: UpdatePoolMatchesDto) {
    const { poolMatches: newPoolMatches } = data;
    const poolMatchesPromises = newPoolMatches.map((poolMatch) => {
      return this.updatePoolMatch(poolId, poolMatch);
    });
    return Promise.all(poolMatchesPromises);
  }

  async updatePoolMatch(poolId: number, changes: PoolMatchDto) {
    const poolMatch = await this.findOne(changes.poolMatchId);
    if (poolMatch.poolId !== poolId) {
      throw new BadRequestException(
        `Pool-match with id '${changes.poolMatchId}' don't belongs to pool with id '${poolId}'.`,
      );
    }
    const localTeam = await this.teamService.findOneById(changes.localId);
    const visitTeam = await this.teamService.findOneById(changes.visitId);
    poolMatch.local = localTeam;
    poolMatch.visit = visitTeam;
    poolMatch.isPredicted = true;
    return this.poolMatchRepository.save(poolMatch);
  }
}
