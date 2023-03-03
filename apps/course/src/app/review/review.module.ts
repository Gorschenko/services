import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema, User, UserSchema } from '@services/database';
import { TelegramModule } from '@services/telegram';
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
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        TelegramModule,
    ],
    providers: [ReviewService, ReviewRepository],
    controllers: [ReviewQueries, ReviewCommands],
})
export class ReviewModule {}
