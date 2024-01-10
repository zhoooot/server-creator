import { DataSourceOptions, DataSource } from 'typeorm';
import { Creator } from './creator/creator';
import { DATABASE_URL } from './config';

export const option: DataSourceOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  entities: [Creator],
  synchronize: true,
  // migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migration_table',
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
    pool: {
      max: 5,
      idleTimeoutMillis: 30000,
    },
  },
};

export default option;

export const dataSource = new DataSource(option);
