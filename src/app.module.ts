import { Module } from '@nestjs/common';
import { CreatorModule } from './creator/creator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import option from './typeorm.config';

@Module({
  imports: [
    CreatorModule,
    TypeOrmModule.forRoot({
      ...option,
    }),
  ],
})
export class AppModule {}
