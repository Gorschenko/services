import { Body, Controller } from '@nestjs/common';
import { ReviewCreateReview, ReviewUpdateReview } from '@services/contracts';
import { TelegramService } from '@services/telegram';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { ReviewService } from '../review.service';

@Controller()
export class ReviewCommands {
    constructor (
        private readonly reviewService: ReviewService,
        // private readonly telegramService: TelegramService
    ) {}

    @RMQValidate()
    @RMQRoute(ReviewCreateReview.topic)
    async createReview(@Body() review: ReviewCreateReview.Request): Promise<ReviewCreateReview.Response> {
        // await this.telegramService.sendMessage('test')
        return await this.reviewService.createReview(review)
    }

    @RMQValidate()
    @RMQRoute(ReviewUpdateReview.topic)
    async updateReview(@Body() body: ReviewUpdateReview.Request): Promise<ReviewUpdateReview.Response> {
        return await this.reviewService.updateReview(body)
    }
}