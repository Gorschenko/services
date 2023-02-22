import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GetCourseReviewsQueryDto, ReviewSort } from '@services/contracts';
import { IReview } from '@services/interfaces';
import { Model } from 'mongoose';
import { Review } from '@services/database';

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

    async findByCourseId(courseId: string, query: GetCourseReviewsQueryDto): Promise<IReview[]> {
        const sortArgs = this.getSortArgs(query.sort)
        return await this.reviewModel
            .find({ courseId })
            .limit(query.limit)
            .skip(query.offset)
            .sort(sortArgs)
            .exec()
    }

    async findOneAndUpdate({ _id, ...rest }: IReview): Promise<IReview> {
        return await this.reviewModel.findOneAndUpdate(
            { _id },
            { $set: { ...rest } },
            { new: true }
        )
    }

    getSortArgs (sort: ReviewSort): {[key: string]: 1 | -1} {
        switch (sort) {
            case ReviewSort.RatingUp:
                return { rating: -1 }
            case ReviewSort.RatingDown:
                return { rating: 1 }
            case ReviewSort.New:
            default:
                return { createdAt: -1 }
        }
    }
}