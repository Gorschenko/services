import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
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
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static',
    })
  ],
  providers: [FilesService],
})
export class AppModule {}
