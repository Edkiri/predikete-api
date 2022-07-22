import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PoolsService } from '../services/pools.service';
import { UpdatePoolMatchDto } from '../dtos/pool-match.dto';
import { PoolMatchesService } from '../services/pools-matches.service';
import { IsPoolOwnerGuard } from '../guards/is-pool-owner.guard';
import { ArePoolMatchesGuard } from '../guards/are-pool-matches.guard';
import { IsGroupMemberGuard } from 'src/users/guards/is-group-member.guard';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';

@UseGuards(JwtAuthGuard, IsGroupMemberGuard)
@Controller('groups/:groupId/pools')
export class PoolsController {
  constructor(
    private readonly poolsService: PoolsService,
    private readonly poolMatchesService: PoolMatchesService,
  ) {}

  @Get()
  getPoolDetails(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Req() req: Request,
  ) {
    const { sub } = req.user as PayloadToken;
    return this.poolsService.getPoolDetails(groupId, sub);
  }

  @Get('/:poolId/gs-pool-matches')
  listUserPoolMatches(@Param('poolId', ParseIntPipe) poolId: number) {
    return this.poolMatchesService.listGSPoolMatches(+poolId);
  }

  @Get('/:poolId/fp-pool-matches')
  listEPPoolMatches(@Param('poolId', ParseIntPipe) poolId: number) {
    return this.poolMatchesService.listFPPoolMatches(+poolId);
  }

  @UseGuards(IsPoolOwnerGuard, ArePoolMatchesGuard)
  @Put(':poolId/pool-matches')
  updatePoolMatch(
    @Param('poolId', ParseIntPipe) poolId: number,
    @Body() data: UpdatePoolMatchDto,
  ) {
    return this.poolsService.updateMatches(+poolId, data);
  }

  @Get('/pool-match/:poolMatchId/points')
  getMatchOnPool(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('poolMatchId', ParseIntPipe) poolMatchId: number,
  ) {
    return this.poolMatchesService.getPoolMatchDetails(+groupId, +poolMatchId);
  }

  @Get(':poolId/next-match')
  getNextPoolMatch(@Param('poolId', ParseIntPipe) poolId: number) {
    return this.poolsService.getNextMatch(+poolId);
  }

  @Get(':poolId/previus-match')
  getPreviusMatch(@Param('poolId', ParseIntPipe) poolId: number) {
    return this.poolsService.getPreviusMatch(+poolId);
  }

  @Get('top-members')
  getTopPoolMembers(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.poolsService.findTopMembers(+groupId);
  }

  @Get('all-members')
  getAllPoolMembers(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.poolsService.findAllMembers(+groupId);
  }
}
