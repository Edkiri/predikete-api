import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
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
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
