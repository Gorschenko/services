import { Body, Controller } from '@nestjs/common';
import { AccountBuyCourse, AccountChangeProfile, AccountCheckPayment } from '@services/contracts';
import { RMQValidate, RMQRoute, RMQService } from 'nestjs-rmq';
import { UserEntity } from './user/entities/user.entity';
import { UserRepository } from './user/repositories/user.repository';
import { BuyCourseSaga } from './user/sagas/buy-course.saga';

@Controller()
export class UserCommands {
    constructor(
        public readonly userRepository: UserRepository,
        private readonly rmqService: RMQService,
    ) {}

    @RMQValidate()
    @RMQRoute(AccountChangeProfile.topic)
    async userInfo(@Body() { user, id }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
        const existedIUser = await this.userRepository.findById(id)
        if (!existedIUser) {
            throw new Error('Такого пользователя не существует')
        }
        const userEntity = new UserEntity(existedIUser).updateProfile(user.displayName)
        await this.userRepository.updateUser(userEntity)
        return {}
    }

    @RMQValidate()
    @RMQRoute(AccountBuyCourse.topic)
    async buyCourse(@Body() { userId, courseId }: AccountBuyCourse.Request): Promise<AccountBuyCourse.Response> {
        const existedUser = await this.userRepository.findById(userId)
        if (!existedUser){
            throw new Error('Такого пользователя нет')
        }
        const userEntity = new UserEntity(existedUser)
        const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService)
        const { user, paymentLink } = await saga.getState().pay()
        await this.userRepository.updateUser(user)
        return { paymentLink }
    }

    @RMQValidate()
    @RMQRoute(AccountCheckPayment.topic)
    async checkPayment(@Body() { userId, courseId }: AccountCheckPayment.Request): Promise<AccountCheckPayment.Response> {
        const existedUser = await this.userRepository.findById(userId)
        if (!existedUser){
            throw new Error('Такого пользователя нет')
        }
        const userEntity = new UserEntity(existedUser)
        const saga = new BuyCourseSaga(userEntity, courseId, this.rmqService)
        const { user, status } = await saga.getState().checkPayment()
        await this.userRepository.updateUser(user)
        return { status }
    }
}
