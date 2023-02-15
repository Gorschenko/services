import { IReview } from '@services/interfaces';
import { IsString, IsNumber, Max, Min, IsMongoId, IsOptional } from 'class-validator';

export class CreateReviewDto implements Omit<IReview, 'userId'> {
    @IsOptional()
    @IsString()
    title?: string
    
    @IsString()
    description: string

    @IsNumber()
    @Max(5)
    @Min(1)
    rating: number

    @IsMongoId()
    courseId: string
}