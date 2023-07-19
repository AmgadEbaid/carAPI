import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  migrationsRun: process.env.DB_NAME === 'test',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});
