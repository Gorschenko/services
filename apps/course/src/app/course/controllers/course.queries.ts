import { Body, Controller } from '@nestjs/common';
import { CourseGetCourse } from '@services/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CourseService } from '../course.service';

@Controller()
export class CourseQueries {
    constructor(
        private readonly courseService: CourseService
    ) {}

    @RMQValidate()
    @RMQRoute(CourseGetCourse.topic)
    async getCourse(@Body() { id }: CourseGetCourse.Request): Promise<CourseGetCourse.Response> {
        return this.courseService.getCourse(id)
    }
}