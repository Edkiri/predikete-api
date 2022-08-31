import { forwardRef, Module } from '@nestjs/common';
import { PoolService } from './services/pool.service';
import { PoolController } from './pool.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from './entities/pool.entity';
import { PoolMatch } from './entities/pool-match.entity';
import { PoolMatchService } from './services/pool-match.service';
import { TournamentModule } from 'src/tournament/tournament.module';
import { GroupModule } from 'src/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pool, PoolMatch]),
    TournamentModule,
    forwardRef(() => GroupModule),
  ],
  providers: [PoolService, PoolMatchService],
  controllers: [PoolController],
  exports: [PoolService],
})
export class PoolModule {}
