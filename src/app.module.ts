import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { TournamentModule } from './tournament/tournament.module';
import { SeederModule } from './seeder/seeder.module';
import { PoolModule } from './pool/pool.module';
import { MembershipModule } from './membership/membership.module';
import config from './config/config';
import configSchema from './config/config.schema';

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
    MembershipModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
