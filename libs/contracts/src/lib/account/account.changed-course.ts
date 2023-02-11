import { PurchaseState } from '@services/interfaces'
import { IsMongoId, IsString } from 'class-validator'

export namespace AccountChangedCourse {
    export const topic = 'account.changed-course.event'

    export class Request {
        @IsMongoId()
        userId: string

        @IsMongoId()
        courseId: string

        @IsString()
        state: PurchaseState
    }
}


