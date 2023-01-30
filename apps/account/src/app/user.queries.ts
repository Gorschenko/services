import { Body, Controller } from '@nestjs/common';
import { AccountUserInfo, AccountUserCourses } from '@services/contracts';
import { RMQValidate, RMQRoute } from 'nestjs-rmq';
import { UserEntity } from './user/entities/user.entity';
import { UserRepository } from './user/repositories/user.repository';


@Controller()
export class UserQueries {
    constructor(
        public readonly userRepository: UserRepository
    ) {}

    @RMQValidate()
    @RMQRoute(AccountUserInfo.topic)
    async userInfo(@Body() { id }: AccountUserInfo.Request): Promise<AccountUserInfo.Response> {
        const user = await this.userRepository.findById(id)
        const profile = new UserEntity(user).getPublicProfile()
        return {
            profile
        }
    }

    @RMQValidate()
    @RMQRoute(AccountUserCourses.topic)
    async userCourses(@Body() { id }: AccountUserCourses.Request): Promise<AccountUserCourses.Response> {
        const user = await this.userRepository.findById(id)
        return {
            courses: user.courses
        }
    }
}

