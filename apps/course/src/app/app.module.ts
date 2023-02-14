import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq/dist/rmq.module';

import { getMongoConfig } from './configs/mongo.config';
import { getRMQConfig } from './configs/rmq.config';
import { CourseModule } from './course/course.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.course.env'
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    CourseModule,
    ReviewModule, 
    MongooseModule.forRootAsync(getMongoConfig()),
  ],
})
export class AppModule {}
