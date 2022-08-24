import { Module } from '@nestjs/common';
import { PoolService } from './pool.service';
import { PoolController } from './pool.controller';

@Module({
  providers: [PoolService],
  controllers: [PoolController],
})
export class PoolModule {}
