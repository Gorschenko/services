import { IsString } from 'class-validator'
import { IUserCourses } from '@services/interfaces'

export namespace AccountUserCourses {
    export const topic = 'account.user-courses.query'

    export class Request {
        @IsString()
        id: string
    }
    
    export class Response {
        courses: IUserCourses[]
    }
}
