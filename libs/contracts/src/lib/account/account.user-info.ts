import { IsEmail } from 'class-validator'
import { IUser } from '@services/interfaces'

export namespace AccountUserInfo {
    export const topic = 'account.user-info.query'

    export class Request {
        @IsEmail()
        id: string
    }
    
    export class Response {
        profile: Omit<IUser, 'passwordHash'>
    }
}


