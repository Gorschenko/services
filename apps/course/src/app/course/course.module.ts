import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseCommands } from './controllers/course.command';
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
    providers: [CourseRepository],
    controllers: [CourseCommands],
})
export class CourseModule {}

