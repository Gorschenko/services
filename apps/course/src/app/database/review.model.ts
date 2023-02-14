import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IReview } from '@services/interfaces';
import { Document } from 'mongoose'


@Schema({ timestamps: true })
export class Review extends Document implements IReview {
    @Prop({ required: true })
    name: string

    @Prop()
    title?: string

    @Prop({ required: true })
    description: string

    @Prop( { required: true } )
    rating: number

    @Prop({ required: true })
    productId: string

    @Prop({ required: true })
    userId: string
}

export const ReviewSchema = SchemaFactory.createForClass(Review)