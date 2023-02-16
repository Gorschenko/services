import { IReview } from '@services/interfaces'
import { IsMongoId } from 'class-validator'

export namespace ReviewGetCourseReviews {
    export const topic = 'review.get-course-reviews.query'
    
    export class Request {
        @IsMongoId()
        courseId: string
    }

    export class Response {
        reviews: IReview[]
    }
}