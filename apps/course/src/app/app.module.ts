import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq/dist/rmq.module';

import { getMongoConfig } from './course/configs/mongo.config';
import { getRMQConfig } from './course/configs/rmq.config';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.course.env'
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    CourseModule,
    MongooseModule.forRootAsync(getMongoConfig()),
  ],
})
export class AppModule {}
