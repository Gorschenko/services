import { InjectModel } from '@nestjs/mongoose';
import { User } from '../database/user.model';
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    async createUser(user: UserEntity) {
        const newUser = new this.userModel(user)
        return await newUser.save()
    }

    async updateUser({ _id, ...rest }: UserEntity) {
        return await this.userModel.updateOne({ _id }, { $set: { ...rest } }).exec()
    }

    async findUser(email: string) {
        return await this.userModel.findOne({ email }).exec()
    }

    async findById(id: string) {
        return await this.userModel.findById(id).exec()
    }

    async deleteUser(email: string) {
        return await this.userModel.deleteOne({ email }).exec()
    }
}