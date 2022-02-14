import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/tournaments/entities/match.entity';
import { PhasesSeederModule } from '../phases/phases.module';
import { TeamsSeederModule } from '../teams/teams.module';
import { MatchesSeederService } from './matches.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    TeamsSeederModule,
    PhasesSeederModule,
  ],
  providers: [MatchesSeederService],
  exports: [MatchesSeederService],
})
export class MatchesSeederModule {}
