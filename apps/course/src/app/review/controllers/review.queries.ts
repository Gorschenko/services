import { Body, Controller } from '@nestjs/common';
import { ReviewGetCourseReviews } from '@services/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { ReviewService } from '../review.service';

@Controller()
export class ReviewQueries {
    constructor(
        private readonly reviewService: ReviewService
    ) {}
    
    @RMQValidate()
    @RMQRoute(ReviewGetCourseReviews.topic)
    async getCourseReviews(@Body() { courseId }: ReviewGetCourseReviews.Request): Promise<ReviewGetCourseReviews.Response> {
        return await this.reviewService.getCourseReviews(courseId)
    }
}