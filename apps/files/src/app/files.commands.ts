import { Body, Controller } from '@nestjs/common';
import { FilesUploadFile } from '@services/contracts';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';

@Controller('files')
export class FilesCommands {
    constructor (
        private readonly filesService: FilesService
    ) {}

    @RMQValidate()
    @RMQRoute(FilesUploadFile.topic)
    async uploadFile(@Body() { file }: FilesUploadFile.Request): Promise<FilesUploadFile.Response> {
        console.log('service file', file)
        const saveArray: MFile[] = [new MFile(file)]
        if (file.mimetype.includes('image')) {
            const buffer = await this.filesService.convertToWebP(file.buffer)
            const newFile = new MFile({
                originalname: `${file.originalname.split('.')[0]}.webp`,
                buffer,
            })
            console.log('newFile', newFile)
            saveArray.push(newFile)
        }
        const files = await this.filesService.saveFiles(saveArray)
        return { files }
    }
}