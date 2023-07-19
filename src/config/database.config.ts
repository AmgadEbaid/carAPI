import { registerAs } from '@nestjs/config';
export default registerAs('database', () => ({
  type: 'sqlite',
  url: process.env.DATABASE_URL,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrationsRun: true,

  synchronize: false,
}));
