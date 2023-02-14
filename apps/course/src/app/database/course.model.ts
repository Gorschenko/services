import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CourseCategory, CourseLanguage, CourseLevel, ICourse } from '@services/interfaces';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document implements ICourse {
    @Prop({ required: true })
    ownerId: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    price: number

    @Prop({
        required: true,
        enum: CourseLevel,
        type: String,
    })
    level: CourseLevel

    @Prop({
        required: true,
        type: String,
        enum: CourseCategory,
    })
    category: CourseCategory

    @Prop({
        required: true,
        type: () => [String],
        enum: CourseCategory,
    })
    languages: Types.Array<CourseLanguage>
}

export const CourseSchema = SchemaFactory.createForClass(Course)

