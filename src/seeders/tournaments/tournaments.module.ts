import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/tournaments/entities/tournaments.entity';
import { TournamentsSeederService } from './tournaments.service';
import { Match } from 'src/tournaments/entities/match.entity';
import { MatchesSeederModule } from '../matches/matches.module';
import { PhasesSeederModule } from '../phases/phases.module';
import { TeamsSeederModule } from '../teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, Match]),
    MatchesSeederModule,
    PhasesSeederModule,
    TeamsSeederModule,
  ],
  providers: [TournamentsSeederService],
  exports: [TournamentsSeederService],
})
export class TournamentsSeederModule {}
