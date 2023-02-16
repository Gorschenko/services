import { Body, Controller } from '@nestjs/common';
import { ReviewCreateReview } from '@services/contracts';
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
}