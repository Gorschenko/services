import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewCreateReview, ReviewGetCourseReviews } from '@services/contracts';
import { RMQService,  } from 'nestjs-rmq';
import { CreateReviewDto } from '../dtos/review/create-review.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

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

    @Get('course/:courseId')
    async getCourseReviews(@Param('courseId', IdValidationPipe) courseId: string): Promise<ReviewGetCourseReviews.Response> {
        try {
            return this.rmqService.send(ReviewGetCourseReviews.topic, { courseId })
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message)
            }
        }
    }
}