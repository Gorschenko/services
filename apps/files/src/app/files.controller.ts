import { Controller } from '@nestjs/common';
import { FilesUploadFile } from '@services/contracts';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesCommands {
    constructor (
        private readonly filesService: FilesService
    ) {}

    async uplodaFile({ file }: FilesUploadFile.Request): Promise<FilesUploadFile.Response> {
        const saveArray: MFile[] = [new MFile(file)]
        if (file.mimetype.includes('image')) {
            const buffer = await this.filesService.convertToWebP(file.buffer)
            const newFile = new MFile({
                originalname: `${file.originalname.split('.')[0]}.webp`,
                buffer,
            })
            saveArray.push(newFile)
        }
        return this.filesService.saveFiles(saveArray)
    }
}