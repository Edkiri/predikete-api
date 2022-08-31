import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { environments } from './environments';
import config from './config/config';
import configSchema from './config/config.schema';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { TournamentModule } from './tournament/tournament.module';
import { SeederModule } from './seeder/seeder.module';
import { PoolModule } from './pool/pool.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
    }),
    DatabaseModule,
    AuthModule,
    GroupModule,
    UserModule,
    TournamentModule,
    SeederModule,
    PoolModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
