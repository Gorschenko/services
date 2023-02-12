import { IsMongoId } from 'class-validator'
import { ICourse } from '@services/interfaces'

export namespace CourseGetCourse {
    export const topic = 'course.get-course.query'

    export class Request {
        @IsMongoId()
        id: string
    }
    
    export class Response {
        course: ICourse
    }
}