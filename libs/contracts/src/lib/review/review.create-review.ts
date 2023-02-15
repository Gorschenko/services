import { IReview } from '@services/interfaces'
import { IsMongoId, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

export namespace ReviewCreateReview {
    export const topic = 'review.create-review.command'

    export class Request {
        @IsOptional()
        @IsString()
        title?: string
        
        @IsString()
        description: string

        @IsNumber()
        @Max(5)
        @Min(1)
        rating: number

        @IsMongoId()
        courseId: string

        @IsMongoId()
        userId: string
    }

    export class Response {
        review: IReview
    }
}