module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsName: 'migrations',
  entities: ['src/**/*.entity.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  ssl:
    process.env.ENVIROMENT === 'development'
      ? null
      : {
          rejectUnauthorized: false,
        },
};
