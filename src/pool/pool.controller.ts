import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IsGroupMemberGuard } from 'src/group/guards';

import { UpdatePoolMatchesDto } from './dto';
import { Pool, PoolMatch } from './entities';
import { PoolMatchService, PoolService } from './services';
import { IsGroupPoolGuard, IsPoolOwnerGuard } from './guards';

@Controller('group/:groupId/pool')
@UseGuards(JwtAuthGuard, IsGroupMemberGuard)
@ApiTags('pool')
export class PoolController {
  constructor(
    private readonly poolService: PoolService,
    private readonly poolMatchService: PoolMatchService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  @ApiOkResponse({ type: () => Pool, isArray: true, status: 200 })
  getGroupPools(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.poolService.findByGroupId(+groupId);
  }

  @Get(':poolId')
  @ApiOkResponse({ type: () => Pool, status: 200 })
  @UseGuards(IsGroupPoolGuard)
  getGroupPool(@Param('poolId', ParseIntPipe) poolId: number) {
    return this.poolService.findOneById(+poolId);
  }

  @Get(':poolId/pool-matches')
  @UseGuards(IsGroupPoolGuard)
  @ApiOkResponse({ type: () => PoolMatch, isArray: true, status: 200 })
  @HttpCode(200)
  getPoolMatches(@Param('poolId', ParseIntPipe) poolId: number) {
    return this.poolService.findPoolMatchesByPoolId(+poolId);
  }

  @UseGuards(IsPoolOwnerGuard)
  @Put(':poolId/update-pool-matches')
  @ApiOkResponse({ status: 204 })
  @HttpCode(204)
  async updatePoolMatches(
    @Param('poolId', ParseIntPipe) poolId: number,
    @Body() data: UpdatePoolMatchesDto,
  ) {
    const poolMatches = await this.dataSource.transaction((manager) => {
      return this.poolMatchService
        .withTransaction(manager)
        .updateAllPoolMatches(poolId, data);
    });
    if (poolMatches.length === 64) {
      return {
        message: 'Pool matches successfully updated.',
        status: 204,
      };
    } else {
      throw new HttpException(
        `Something went wrong while updating all 64 pool matches.`,
        500,
      );
    }
  }
}
