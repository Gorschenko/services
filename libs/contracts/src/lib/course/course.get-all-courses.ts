import { ICourse } from '@services/interfaces'
import { Type } from 'class-transformer'
import { IsEnum, IsOptional, Min, ValidateNested } from 'class-validator'

export enum CourseSort {
    PriceUp = 'priceUp',
    PriceDown = 'priceDown',
    New = 'new',
}

export class GetAllCoursesDto {
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
}

export namespace CourseGetAllCourses {
    export const topic = 'course.get-all-courses.query'

    export class Request {
        @ValidateNested()
        @Type(() => GetAllCoursesDto)
        @IsOptional()
        query?: GetAllCoursesDto
    }

    export class Response { 
        courses: ICourse[]
    }
}