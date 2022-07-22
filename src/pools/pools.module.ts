import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolMatch } from './entities/pool-match.entity';
import { Pool } from './entities/pool.entity';
import { PoolsController } from './controllers/pools.controller';
import { PoolsService } from './services/pools.service';
import { UsersModule } from 'src/users/users.module';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { PoolMatchesService } from './services/pools-matches.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pool, PoolMatch]),
    forwardRef(() => UsersModule),
    forwardRef(() => TournamentsModule),
  ],
  controllers: [PoolsController],
  providers: [PoolsService, PoolMatchesService],
  exports: [PoolsService, PoolMatchesService],
})
export class PoolsModule {}
