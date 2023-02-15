import { BadRequestException, Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewCreateReview } from '@services/contracts';
import { RMQService,  } from 'nestjs-rmq';
import { CreateReviewDto } from '../dtos/review/create-review.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Controller('review')
export class ReviewController {
    constructor(
        private readonly rmqService: RMQService
    ) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    async createReview (@Body() dto: CreateReviewDto, @UserId() userId: string): Promise<ReviewCreateReview.Response> {
        try {
            return this.rmqService.send(ReviewCreateReview.topic, { ...dto, userId })
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message)
            }
        }
    }
}