import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseCommands } from './controllers/course.command';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './database/course.model';
import { CourseRepository } from './repositories/course.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Course.name,
                schema: CourseSchema,
            },
        ]),
    ],
    providers: [CourseRepository, CourseService],
    controllers: [CourseCommands],
})
export class CourseModule {}

