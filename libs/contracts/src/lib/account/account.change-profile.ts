import { IsMongoId, IsString } from 'class-validator'

export namespace AccountChangeProfile {
    export const topic = 'account.change-profile.command'

    export class Request {
        @IsMongoId()
        id: string
        
        @IsString()
        displayName: string
    }
    
    export class Response {
    }
}


