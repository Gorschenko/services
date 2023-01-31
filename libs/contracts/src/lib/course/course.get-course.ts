import { IsEmail } from 'class-validator'
import { ICourse } from '@services/interfaces'

export namespace CourseGetCourse {
    export const topic = 'course.get-course.query'

    export class Request {
        @IsEmail()
        id: string
    }
    
    export class Response {
        course: ICourse | null
    }
}