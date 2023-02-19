import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CourseSort, GetAllCoursesQueryDto } from '@services/contracts';
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

    async find({ sort, offset, limit, category, level, languages }: GetAllCoursesQueryDto): Promise<ICourse[]> {
        const sortArgs = this.getSortArgs(sort)
        const filters = this.getValidFilters({ category, level, languages })
        return await this.courseModel
            .find(filters)
            .sort(sortArgs)
            .limit(limit)
            .skip(offset)
            .exec()
    }

    getSortArgs (sort: CourseSort): {[key: string]: 1 | -1} {
        switch (sort) {
            case CourseSort.PriceUp:
                return { price: -1 }
            case CourseSort.PriceDown:
                return { price: 1 }
            case CourseSort.New:
            default:
                return { createdAt: -1 }
        }
    }

    getValidFilters(filters) {
        return Object.entries(filters).reduce((acc, [k, v]) => {
            if (v) {
                acc[k] = v
            }
            return acc
        }, {})
    }
}