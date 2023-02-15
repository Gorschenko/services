import { Injectable } from '@nestjs/common';
import { IReview } from '@services/interfaces';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
    constructor(
        private readonly reviewRepository: ReviewRepository
    ) {}

    async createCourse(review: IReview): Promise<{ review: IReview }> {
        // сделать проверку на наличие курса (courseId)
        const newReview = await this.reviewRepository.createReview(review)
        return {
            review: newReview,
        }
    }
}