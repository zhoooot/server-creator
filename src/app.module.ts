import { Module } from '@nestjs/common';
import { CreatorModule } from './creator/creator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creator } from './creator/creator';
import { ReportModule } from './report/report.module';
import { Report } from './report/report';

@Module({
  imports: [
    CreatorModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'zhoot',
      password: 'pass',
      database: 'server-creator',
      entities: [Creator, Report],
      synchronize: true,
    }),
    ReportModule,
  ],
})
export class AppModule {}
