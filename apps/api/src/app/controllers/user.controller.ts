import { Controller, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AccountUserCourses, AccountUserInfo } from '@services/contracts';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly rmqService: RMQService,
    ) {}

    @Get('info')
    async getUser(@UserId () id: string): Promise<AccountUserInfo.Response> {
        try {
            return this.rmqService.send<AccountUserInfo.Request, AccountUserInfo.Response>(AccountUserInfo.topic, { id })
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message)
            }
        }
    }

    @Get('courses')
    async getCourses(@UserId () id: string): Promise<AccountUserCourses.Response> {
        try {
            return this.rmqService.send<AccountUserCourses.Request, AccountUserCourses.Response>(AccountUserCourses.topic, { id })
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message)
            }
        }
    }
}
