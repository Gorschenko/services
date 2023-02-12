import { Injectable } from '@nestjs/common';
import { ICourse } from '@services/interfaces';
import { CourseRepository } from './repositories/course.repository';

@Injectable()
export class CourseService {
    constructor (private readonly courseRepository: CourseRepository) {}

    async createCourse(course: ICourse): Promise<{ course: ICourse }> {
        const newCourse = await this.courseRepository.createCourse(course)
        return { course: newCourse }
    }
}