import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICourse } from '@services/interfaces';
import { Model } from 'mongoose';
import { Course } from '../database/course.model';

@Injectable()
export class CourseRepository {
    constructor(
        @InjectModel(Course.name) private readonly courseModel: Model<Course>
    ) {}

    async createCourse(course: ICourse): Promise<ICourse> {
        const newCourse = new this.courseModel(course)
        return newCourse.save()
    }

    async findById(id: string): Promise<ICourse | null> {
        return await this.courseModel.findById(id).exec()
    }

    async find(): Promise<ICourse[]> {
        return await this.courseModel.find().exec()
    }
}