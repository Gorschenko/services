import { ICourse } from '@services/interfaces'

export namespace CourseGetAllCourses {
    export const topic = 'course.get-all-courses.query'

    export class Request {

    }

    export class Response { 
        courses: ICourse[]
    }
}