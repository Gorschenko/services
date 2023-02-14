import { Injectable } from '@nestjs/common';
import { ICourse } from '@services/interfaces';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
    constructor (private readonly courseRepository: CourseRepository) {}

    async createCourse(course: ICourse): Promise<{ course: ICourse }> {
        const newCourse = await this.courseRepository.createCourse(course)
        return { course: newCourse }
    }

    async getCourse(id: string): Promise<{ course: ICourse }> {
        const course = await this.courseRepository.findById(id)
        if (!course) {
            throw new Error('Такого курса нет')
        }
        return {
            course
        }
    }
    
    async getAllCourses(): Promise<{ courses: ICourse[] }> {
        const courses = await this.courseRepository.find()
        return {
            courses,
        }
    }
}