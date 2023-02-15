import { CourseCategory, CourseLanguage, CourseLevel, ICourse } from '@services/interfaces';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto implements Omit<ICourse, 'ownerId'> {
    @IsString()
    name: string

    @IsNumber()
    price: number
    
    @IsString()
    @IsEnum(CourseLevel)
    level: CourseLevel

    @IsString()
    @IsEnum(CourseCategory)
    category: CourseCategory

    @IsArray()
    @IsEnum(CourseLanguage, { each: true })
    languages: CourseLanguage[]
}