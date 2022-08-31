import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupStage, Match, Team, Tournament } from './entities';
import {
  GroupStageService,
  MatchService,
  TeamService,
  TournamentService,
} from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Team, GroupStage, Match])],
  providers: [TournamentService, TeamService, GroupStageService, MatchService],
  exports: [TournamentService, MatchService],
})
export class TournamentModule {}
