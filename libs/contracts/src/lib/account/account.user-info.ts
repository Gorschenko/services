import { IsMongoId } from 'class-validator'
import { IUser } from '@services/interfaces'

export namespace AccountUserInfo {
    export const topic = 'account.user-info.query'

    export class Request {
        @IsMongoId()
        id: string
    }
    
    export class Response {
        profile: Omit<IUser, 'passwordHash'>
    }
}
