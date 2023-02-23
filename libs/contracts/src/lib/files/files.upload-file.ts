
import { Express } from 'express'
import { Multer } from 'multer'

export class FileElementResponse {
    url: string
    name: string
}

export namespace FilesUploadFile {
    export const topic = 'files.upload-file.command'

    export class Request {
        file: Express.Multer.File
    }

    export class Response extends FileElementResponse {

    }
}