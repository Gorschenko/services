import { Injectable } from '@nestjs/common';
import { FileElementResponse } from '@services/contracts';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
    async convertToWebP(file: Buffer): Promise<Buffer> {
        console.log('sharp file', file)
        return sharp(file).webp().toBuffer()
    }

    async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
        const dateFolder = format(new Date(), 'yyyy-MM-dd')
        const uploadFolder = `${path}/uploads/${dateFolder}`
        await ensureDir(uploadFolder)
        const res: FileElementResponse[] = []
        for (const file of files) {
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
            res.push({ url:  `${dateFolder}/${file.originalname}`, name: file.originalname})
        }
        return res
    }
}