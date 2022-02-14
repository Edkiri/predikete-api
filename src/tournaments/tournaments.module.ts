import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Phase } from './entities/phase.entity';
import { Team } from './entities/team.entity';
import { Tournament } from './entities/tournaments.entity';
import { TournamentsController } from './controllers/tournaments.controller';
import { TournamentsService } from './services/tournaments.service';
import { UsersModule } from 'src/users/users.module';
import { PhasesService } from './services/phases.service';
import { GroupStage } from './entities/group-stage.entity';
import { GroupStagesService } from './services/group-stages.service';
import { TeamsService } from './services/teams.service';
import { MatchesService } from './services/matches.service';
import { MatchesController } from './controllers/matches.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Match, Phase, Team, GroupStage]),
    UsersModule,
  ],
  providers: [
    TournamentsService,
    PhasesService,
    GroupStagesService,
    TeamsService,
    MatchesService,
  ],
  controllers: [TournamentsController, MatchesController],
})
export class TournamentsModule {}
