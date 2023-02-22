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

    async findByCourseId(courseId: string, { sort, limit, offset }: GetCourseReviewsQueryDto): Promise<IReview[]> {
        return await this.reviewModel
            .aggregate()
            .match({ courseId })
            .limit(limit ? +limit : 25)
            .skip(offset ? +offset : 0)
            .sort(this.getSortArgs(sort))
            .addFields({
                userId: {
                    $toObjectId: '$userId'
                }
            })
            .lookup({
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
            })
            .unwind('$user')
            .project({
                'user.passwordHash': 0,
            })
            .exec() as unknown as IReview[]
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