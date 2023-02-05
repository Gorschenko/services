import { Injectable } from '@nestjs/common';
import { IUser } from '@services/interfaces';
import { RMQService } from 'nestjs-rmq';
import { UserEventEmiter } from './user.event-emiter';
import { UserEntity } from './user/entities/user.entity';
import { UserRepository } from './user/repositories/user.repository';
import { BuyCourseSaga } from './user/sagas/buy-course.saga';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        private readonly rmqService: RMQService,
        private readonly userEventEmiter: UserEventEmiter,
    ) {}
    
    public async changeProfile(displayName: string, id: string) {
        const existedIUser = await this.userRepository.findById(id)
        if (!existedIUser) {
            throw new Error('Такого пользователя не существует')
        }
        const userEntity = new UserEntity(existedIUser).updateProfile(displayName)
        await this.updateUser(userEntity)
        return {}
    }

    public async buyCourse(userId: string, courseId: string) {
        const existedUser = await this.userRepository.findById(userId)
        if (!existedUser){
            throw new Error('Такого пользователя нет')
        }
        const userEntity = new UserEntity(existedUser)
        const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService)
        const { user, paymentLink } = await saga.getState().pay()
        await this.updateUser(user)
        return { paymentLink }
    }

    public async checkPayment(userId: string, courseId: string) {
        const existedUser = await this.userRepository.findById(userId)
        if (!existedUser){
            throw new Error('Такого пользователя нет')
        }
        const userEntity = new UserEntity(existedUser)
        const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService)
        const { user, status } = await saga.getState().checkPayment()
        await this.updateUser(user)
        return { status }
    }

    private updateUser(user: UserEntity) {
        return Promise.all([
            this.userEventEmiter.handle(user),
            this.userRepository.updateUser(user)
        ])
    }
}