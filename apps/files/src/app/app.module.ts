import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { FilesCommands } from './files.controller';
import { FilesService } from './files.service';
@Module({
  controllers: [FilesCommands],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static',
    })
  ],
  providers: [FilesService],
})
export class AppModule {}
