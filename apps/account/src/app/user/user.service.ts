import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserEventEmiter } from './user.event-emiter';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { BuyCourseSaga } from './sagas/buy-course.saga';

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
        return userEntity.getPublicProfile()
    }

    public async buyCourse(courseId: string, userId: string) {
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

    public async checkPayment(courseId: string, userId: string) {
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