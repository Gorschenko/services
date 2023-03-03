import { Module } from '@nestjs/common';
import { FilesCommands } from './files.commands';
import { FilesService } from './files.service';

@Module({
    controllers: [FilesCommands],
    providers: [FilesService],
})
export class FilesModule {}
