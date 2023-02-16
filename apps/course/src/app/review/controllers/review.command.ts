import { Body, Controller } from '@nestjs/common';
import { ReviewCreateReview, ReviewUpdateReview } from '@services/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { ReviewService } from '../review.service';

@Controller()
export class ReviewCommands {
    constructor (
        private readonly reviewService: ReviewService
    ) {}

    @RMQValidate()
    @RMQRoute(ReviewCreateReview.topic)
    async createCourse(@Body() review: ReviewCreateReview.Request): Promise<ReviewCreateReview.Response> {
        return await this.reviewService.createCourse(review)
    }

    @RMQValidate()
    @RMQRoute(ReviewUpdateReview.topic)
    async updateReview(@Body() body: ReviewUpdateReview.Request): Promise<ReviewUpdateReview.Response> {
        return await this.reviewService.updateReview(body)
    }
}