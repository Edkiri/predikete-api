import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgresUrl: process.env.DATABASE_URL,
    jtw: {
      secret: process.env.JWT_SECRET,
      expireDays: process.env.JWT_VALID_DAYS,
    },
    env: process.env.ENVIROMENT || 'development',
    adminUser: {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      displayName: process.env.ADMIN_DISPLAY_NAME,
    },
  };
});
