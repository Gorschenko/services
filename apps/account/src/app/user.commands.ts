import { Body, Controller } from '@nestjs/common';
import { AccountBuyCourse, AccountChangeProfile, AccountCheckPayment } from '@services/contracts';
import { RMQValidate, RMQRoute } from 'nestjs-rmq';
import { UserEntity } from './user/entities/user.entity';
import { UserRepository } from './user/repositories/user.repository';

@Controller()
export class UserCommands {
    constructor(
        public readonly userRepository: UserRepository
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

    }

    @RMQValidate()
    @RMQRoute(AccountCheckPayment.topic)
    async checkPayment(@Body() { userId, courseId }: AccountCheckPayment.Request): Promise<AccountCheckPayment.Response> {

    }
}
