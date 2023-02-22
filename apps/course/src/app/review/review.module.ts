import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from '@services/database';
import { ReviewCommands } from './controllers/review.command';
import { ReviewQueries } from './controllers/review.queries';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Review.name,
                schema: ReviewSchema,
            },
        ]),
    ],
    providers: [ReviewService, ReviewRepository],
    controllers: [ReviewQueries, ReviewCommands],
})
export class ReviewModule {}
