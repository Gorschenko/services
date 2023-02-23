import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
@Module({
  controllers: [FilesController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static',
    })
  ],
  providers: [FilesService],
})
export class AppModule {}
