import { Body, Controller } from '@nestjs/common';
import { AccountBuyCourse, AccountChangeProfile, AccountCheckPayment } from '@services/contracts';
import { RMQValidate, RMQRoute } from 'nestjs-rmq';
import { UserService } from './user.service';

@Controller()
export class UserCommands {
    constructor(private readonly userService: UserService) {}

    @RMQValidate()
    @RMQRoute(AccountChangeProfile.topic)
    async changeProfile(@Body() { displayName, id }: AccountChangeProfile.Request): Promise<AccountChangeProfile.Response> {
        return this.userService.changeProfile( displayName, id)
    }

    @RMQValidate()
    @RMQRoute(AccountBuyCourse.topic)
    async buyCourse(@Body() { userId, courseId }: AccountBuyCourse.Request): Promise<AccountBuyCourse.Response> {
        return this.userService.buyCourse(userId, courseId)
    }

    @RMQValidate()
    @RMQRoute(AccountCheckPayment.topic)
    async checkPayment(@Body() { userId, courseId }: AccountCheckPayment.Request): Promise<AccountCheckPayment.Response> {
        return this.userService.checkPayment(userId, courseId)
    }
}
