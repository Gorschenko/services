import { IReview } from '@services/interfaces'
import {
    IsMongoId,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

export namespace ReviewUpdateReview {
    export const topic = 'review.update-review.command'

    export  class Request {
        @IsMongoId()
        reviewId: string

        @IsOptional()
        @IsString()
        title?: string

        @IsOptional()
        @IsString()
        description?: string

        @IsOptional()
        @IsNumber()
        rating?: number
    }

    export class Response {
        review: IReview
    }
}