import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRMQConfig } from './configs/rmq.config';
import { FilesCommands } from './files.commands';
import { FilesService } from './files.service';
@Module({

  controllers: [FilesCommands],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.files.env'
    }),
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  providers: [FilesService],
})
export class AppModule {}
