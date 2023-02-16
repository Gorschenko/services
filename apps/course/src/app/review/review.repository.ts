import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IReview } from '@services/interfaces';
import { Model } from 'mongoose';
import { Review } from '../database/review.model';

@Injectable()
export class ReviewRepository {
    constructor(
        @InjectModel(Review.name) private readonly reviewModel: Model<Review>
    ) {}

    async createReview(review: IReview): Promise<IReview> {
        const newReview = new this.reviewModel(review)
        return newReview.save()
    }

    async findById(reviewId: string): Promise<IReview | null> {
        return await this.reviewModel.findOne({ _id: reviewId }).exec()
    }

    async findByCourseId(courseId: string): Promise<IReview[]> {
        return await this.reviewModel.find({ courseId }).exec()
    }

    async findOneAndUpdate({ _id, ...rest }: IReview): Promise<IReview> {
        return await this.reviewModel.findOneAndUpdate(
            { _id },
            { $set: { ...rest } },
            { new: true }
        )
    }
}