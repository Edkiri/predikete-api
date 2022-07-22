import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/users/models/role.model';
import { UpdateTournamentDto } from '../dtos/tournament.dto';
import { GroupStagesService } from '../services/group-stages.service';
import { PhasesService } from '../services/phases.service';
import { TournamentsService } from '../services/tournaments.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('tournaments')
export class TournamentsController {
  constructor(
    private readonly tournamentsService: TournamentsService,
    private readonly groupStagesService: GroupStagesService,
    private readonly phasesService: PhasesService,
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.tournamentsService.find();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tournamentsService.findOne(+id);
  }

  @Public()
  @Get('group-stage/:groupName')
  getGroupStage(@Param('groupName') groupName: string) {
    return this.groupStagesService.findByName(1, groupName);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTournamentDto,
  ) {
    return this.tournamentsService.update(+id, payload);
  }

  @Public()
  @Get(':tournamentId/group-stage/:groupName/stats')
  getGroupStageStats(
    @Param('tournamentId', ParseIntPipe) tournamentId: number,
    @Param('groupName') groupName: string,
  ) {
    return this.groupStagesService.getGroupStats(+tournamentId, groupName);
  }

  @Public()
  @Get(':tournamentId/group-stage/:groupName/matches')
  getGroupStageMatches(
    @Param('tournamentId', ParseIntPipe) tournamentId: number,
    @Param('groupName') groupName: string,
  ) {
    return this.groupStagesService.getGroupMatches(+tournamentId, groupName);
  }

  @Public()
  @Get(':tournamentId/final-phase')
  getFinalPhaseMathes(
    @Param('tournamentId', ParseIntPipe) tournamentId: number,
  ) {
    return this.phasesService.getMatches(tournamentId);
  }
}
