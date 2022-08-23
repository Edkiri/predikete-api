import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournaments.entity';
import { TournamentService } from './tournament.service';
import { TeamService } from './services/team.service';
import { Team } from './entities/team.entity';
import { GroupStageService } from './services/group-stage.service';
import { GroupStage } from './entities/group-stage.entity';
import { Match } from './entities/match.entity';
import { MatchService } from './services/match.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Team, GroupStage, Match])],
  providers: [TournamentService, TeamService, GroupStageService, MatchService],
  exports: [TournamentService],
})
export class TournamentModule {}
