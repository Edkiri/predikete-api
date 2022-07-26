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
        const { env, postgresUrl } = configService;
        return {
          type: 'postgres',
          url: postgresUrl,
          autoLoadEntities: true,
          synchronize: env === 'development',
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
