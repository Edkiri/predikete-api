import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Phase } from './entities/phase.entity';
import { Team } from './entities/team.entity';
import { Tournament } from './entities/tournaments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Match, Phase])],
  providers: [],
})
export class TournamentsModule {}
