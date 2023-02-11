import { IsMongoId } from 'class-validator'

export class BuyCourseDto {
    @IsMongoId()
    courseId: string
}