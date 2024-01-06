import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Creator } from './creator/creator';
import { Report } from './report/report';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  url: process.env.DATABASE_URL,
  type: 'mysql',
  entities: [Creator, Report],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
};

export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);

export default typeOrmConfig;
