import { IReview } from '@services/interfaces'
import { Type } from 'class-transformer'
import { IsEnum, IsMongoId, IsOptional, ValidateNested } from 'class-validator'

export enum ReviewSort {
    RatingUp = 'ratingUp',
    RatingDown = 'ratingDown',
    New = 'new',
}

export class GetCourseReviewsQueryDto {
    @IsEnum(ReviewSort)
    @IsOptional()
    sort?: ReviewSort
}
export namespace ReviewGetCourseReviews {
    export const topic = 'review.get-course-reviews.query'
    
    export class Request {
        @IsMongoId()
        courseId: string

        @ValidateNested()
        @Type(() => GetCourseReviewsQueryDto)
        @IsOptional()
        query?: GetCourseReviewsQueryDto
    }

    export class Response {
        reviews: IReview[]
    }
}