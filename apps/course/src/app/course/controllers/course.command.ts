import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { CourseCreateCourse } from '@services/contracts';
import { CourseService } from '../course.service';
@Controller()
export class CourseCommands {
    constructor(private readonly courseService: CourseService) {}

    @RMQValidate()
    @RMQRoute(CourseCreateCourse.topic)
    async createCourse(@Body() course: CourseCreateCourse.Request): Promise<CourseCreateCourse.Response> {
        return this.courseService.createCourse(course)
    }
}