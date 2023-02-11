import { IsMongoId } from 'class-validator'

export namespace AccountBuyCourse {
    export const topic = 'account.buy-course.command'

    export class Request {
        @IsMongoId()
        userId: string

        @IsMongoId()
        courseId: string
    }
    
    export class Response {
        paymentLink: string
    }
}


