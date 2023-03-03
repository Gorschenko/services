import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { FilesModule } from './files/files.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.files.env',
    }),
    RMQModule.forRootAsync(getRMQConfig()),
    FilesModule,
  ],
})
export class AppModule {}
