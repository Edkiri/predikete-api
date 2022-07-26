import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, password, dbName, port } = configService.postgres;
        const { env } = configService;
        return {
          type: 'postgres',
          username: user,
          host,
          password,
          port,
          database: dbName,
          autoLoadEntities: true,
          synchronize: env === 'development',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
