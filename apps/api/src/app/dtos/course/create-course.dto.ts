import { CourseCategory, CourseLanguage, CourseLevel, ICourse } from '@services/interfaces';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto implements Omit<ICourse, 'ownerId'> {
    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsEnum(CourseLevel)
    level: CourseLevel

    @IsArray()
    @IsEnum(CourseCategory)
    category: CourseCategory[]

    @IsArray()
    @IsEnum(CourseLanguage)
    language: CourseLanguage[]
}