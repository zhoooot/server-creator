import { Module } from '@nestjs/common';
import { CreatorModule } from './creator/creator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportModule } from './report/report.module';
import typeOrmConfig from './typeorm.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CreatorModule,
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
    }),
    JwtModule.register({
      publicKey: process.env.JWT_PUBLIC_KEY,
      signOptions: {
        algorithm: 'RS256',
      },
    }),
    ReportModule,
  ],
})
export class AppModule {}
