import { CourseLevel, CourseCategory, CourseLanguage, ICourse } from '@services/interfaces'
import { IsMongoId, IsString, IsNumber, IsEnum, IsArray } from 'class-validator'

export namespace CourseCreateCourse {
    export const topic = 'course.create-course.command'

    export class Request implements ICourse {
        @IsMongoId()
        ownerId: string
    
        @IsString()
        name: string
    
        @IsNumber()
        price: number
    
        @IsEnum(CourseLevel)
        level: CourseLevel
    
        @IsEnum(CourseCategory)
        category: CourseCategory
    
        @IsArray()
        @IsEnum(CourseLanguage, { each: true })
        languages: CourseLanguage[]
    }

    export class Response {
        course: ICourse
    }
}