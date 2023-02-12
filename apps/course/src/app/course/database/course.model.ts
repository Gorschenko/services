import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CourseCategory, CourseLanguage, CourseLevel, ICourse } from '@services/interfaces';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document implements ICourse {
    @Prop({ required: true })
    ownerId: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    price: number

    @Prop({ required: true, enum: CourseLevel })
    level: CourseLevel

    @Prop({
        required: true,
        type: [CourseCategory],
        enum: CourseCategory,
    })
    category: Types.Array<CourseCategory>

    @Prop({
        required: true,
        type: [CourseLanguage],
        enum: CourseCategory,
    })
    language: Types.Array<CourseLanguage>
}

export const CourseSchema = SchemaFactory.createForClass(Course)

