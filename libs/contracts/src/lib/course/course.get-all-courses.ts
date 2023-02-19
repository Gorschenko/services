import { CourseCategory, CourseLanguage, CourseLevel, ICourse } from '@services/interfaces'
import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsOptional, Min, ValidateNested } from 'class-validator'

export enum CourseSort {
    PriceUp = 'priceUp',
    PriceDown = 'priceDown',
    New = 'new',
}

export class GetAllCoursesQueryDto {
    @IsEnum(CourseSort)
    @IsOptional()
    sort?: CourseSort
    
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    offset?: number 

    @Min(0)
    @Type(() => Number)
    @IsOptional()
    limit?: number

    
    @IsEnum(CourseCategory)
    @IsOptional()
    category?: CourseCategory

    @IsEnum(CourseLevel)
    @IsOptional()
    level?: CourseLevel
    
    @IsArray()
    @IsEnum(CourseLanguage, { each: true })
    @IsOptional()
    languages?: CourseLanguage[]
}

export namespace CourseGetAllCourses {
    export const topic = 'course.get-all-courses.query'

    export class Request {
        @ValidateNested()
        @Type(() => GetAllCoursesQueryDto)
        @IsOptional()
        query?: GetAllCoursesQueryDto
    }

    export class Response { 
        courses: ICourse[]
    }
}