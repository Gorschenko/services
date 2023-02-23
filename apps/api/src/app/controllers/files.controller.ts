import {
    Controller,
    HttpCode,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUploadFile } from '@services/contracts';
import { RMQService } from 'nestjs-rmq';
import { UploadFileDto } from '../dtos/files/upload-file.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('files')
export class FilesController {
    constructor (
        private readonly rmqService: RMQService
    ) {}
    
    @Post('upload')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() file: UploadFileDto): Promise<FilesUploadFile.Response[]> {
        return this.rmqService.send(FilesUploadFile.topic, { file })
    }
}