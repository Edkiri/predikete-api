import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';
import { Match } from 'src/tournament/entities/match.entity';
import { MatchService } from 'src/tournament/services/match.service';
import { Repository } from 'typeorm';
import { UpdatePoolMatchesDto } from '../dto';
import { Pool, PoolMatch } from '../entities';

@Injectable()
export class PoolMatchService extends TransactionFor<PoolMatchService> {
  constructor(
    @InjectRepository(PoolMatch)
    private readonly poolMatchRepository: Repository<PoolMatch>,
    private readonly tournamentMatchService: MatchService,
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

  async findPoolMatches(pool: Pool) {
    return this.poolMatchRepository.find({
      where: { pool: { id: pool.id } },
    });
  }

  async updateMany(data: UpdatePoolMatchesDto) {
    const { poolMatches: newPoolMatches } = data;
  }
}
