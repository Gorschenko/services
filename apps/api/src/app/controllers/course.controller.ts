import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CourseCreateCourse, CourseGetAllCourses, CourseGetCourse, GetAllCoursesQueryDto } from '@services/contracts';
import { RMQService } from 'nestjs-rmq';
import { CreateCourseDto } from '../dtos/course/create-course.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';
import { IdValidationPipe } from '../pipes/id-validation.pipe';



@Controller('course')
export class CourseController {
    constructor(
        private readonly rmqService: RMQService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    async createCourse(@Body() dto: CreateCourseDto, @UserId() userId: string): Promise<CourseCreateCourse.Response> {
        try {
            return this.rmqService.send<CourseCreateCourse.Request, CourseCreateCourse.Response>(CourseCreateCourse.topic, { ...dto, ownerId: userId })
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message)
            }
        }
    }


    @Get(':courseId')
    async getCourse(@Param('courseId', IdValidationPipe) courseId: string): Promise<CourseCreateCourse.Response> {
        try {
            return this.rmqService.send<CourseGetCourse.Request, CourseGetCourse.Response>(CourseGetCourse.topic, { id: courseId })
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message)
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Get()
    async getAllCourses(@Query() query: GetAllCoursesQueryDto): Promise<CourseGetAllCourses.Response> {
        try {
            return this.rmqService.send(CourseGetAllCourses.topic, { query })
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message)
            }
        }
    }
}