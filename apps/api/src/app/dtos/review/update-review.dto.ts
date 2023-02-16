import { IsOptional, IsString, IsNumber } from 'class-validator'

export class UpdateReviewDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsNumber()
    rating?: number
}