import { Module } from '@nestjs/common';
import { TeamsSeederModule } from './teams/teams.module';
import { Seeder } from './seeder';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from 'src/environments';
import { TournamentsSeederModule } from './tournaments/tournaments.module';
import { MatchesSeederModule } from './matches/matches.module';
import { PhasesSeederModule } from './phases/phases.module';
import config from 'src/config/config';
import configSchema from 'src/config/config.schema';
import { UserSeederModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    DatabaseModule,
    TeamsSeederModule,
    TournamentsSeederModule,
    MatchesSeederModule,
    PhasesSeederModule,
    UserSeederModule,
  ],
  providers: [Seeder],
})
export class SeederModule {}
