import { Module } from '@nestjs/common';
import { CreatorModule } from './creator/creator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Creator } from './creator/creator';

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
      entities: [Creator],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
