import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseCommands } from './controllers/course.commands';
import { CourseQueries } from './controllers/course.queries';
import { CourseService } from './course.service';
import { Course, CourseSchema } from '../../../../../libs/database/src/lib/models/course.model';
import { CourseRepository } from './course.repository';

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
    controllers: [CourseCommands, CourseQueries],
})
export class CourseModule {}

