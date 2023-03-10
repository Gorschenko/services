import { Injectable } from '@nestjs/common';
import { GetCourseReviewsQueryDto, ReviewUpdateReview } from '@services/contracts';
import { IReview } from '@services/interfaces';
import { ReviewEntity } from './review.entity';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
    constructor(
        private readonly reviewRepository: ReviewRepository
    ) {}

    async createReview(review: IReview): Promise<{ review: IReview }> {
        const newReview = await this.reviewRepository.createReview(review)
        return {
            review: newReview,
        }
    }

    async getCourseReviews(courseId: string, query: GetCourseReviewsQueryDto): Promise<{ reviews: IReview[] }> {
        const reviews = await this.reviewRepository.findByCourseId(courseId, query)
        return {
            reviews
        }
    }

    async updateReview({ reviewId, ...update }: ReviewUpdateReview.Request): Promise<{ review: IReview }> {
        const review = await this.reviewRepository.findById(reviewId)
        if (!review) {
            throw new Error('Такого резюме нет')
        }

        const reviewEntity = new ReviewEntity(review).updateEntity(update)
        const updatedReview = await this.reviewRepository.findOneAndUpdate(reviewEntity)
        return {
            review: updatedReview,
        }
    }
}