import { ReviewUpdateReview } from '@services/contracts';
import { IReview } from '@services/interfaces';

export class ReviewEntity implements IReview {
    _id?: string
    title: string
    description: string
    rating: number
    userId: string
    courseId: string

    constructor(review: IReview) {
        this._id = review._id
        this.title = review.title
        this.description = review.description
        this.rating = review.rating
        this.userId = review.userId
        this.courseId = review.courseId
    }

    public updateEntity (update: Omit<ReviewUpdateReview.Request, 'reviewId'>): IReview {
        Object.entries(update).forEach(([k, v]) => {
            this[k] = v
        })
        return this
    }
}