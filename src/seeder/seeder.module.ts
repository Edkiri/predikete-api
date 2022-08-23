import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'src/config/config';
import configSchema from 'src/config/config.schema';
import { DatabaseModule } from 'src/database/database.module';
import { environments } from 'src/environments';
import { TournamentModule } from 'src/tournament/tournament.module';
import { UserModule } from 'src/user/user.module';
import { SeederService } from './seerder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    DatabaseModule,
    UserModule,
    TournamentModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
