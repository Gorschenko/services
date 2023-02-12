import { CourseCategory, CourseLanguage, CourseLevel, ICourse } from '@services/interfaces';

export class CourseEntity implements ICourse {
    _id?: string
    ownerId: string
    name: string
    price: number
    level: CourseLevel
    category: CourseCategory[]
    language: CourseLanguage[]


    constructor (course: ICourse) {
        this._id = course._id
        this.ownerId = course.ownerId
        this.name = course.name
        this.price = course.price
        this.level = course.level
        this.category = course.category
        this.language = course.language
    }
}