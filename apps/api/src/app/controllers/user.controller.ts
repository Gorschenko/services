import { Controller, Get, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AccountUserInfo } from '@services/contracts';
import { RMQService } from 'nestjs-rmq';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Controller('user')
export class UserController {
    constructor(
        private readonly rmqService: RMQService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('info')
    async info(@UserId () id: string) {
        try {
            return this.rmqService.send<AccountUserInfo.Request, AccountUserInfo.Response>(AccountUserInfo.topic, { id })
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message)
            }
        }
    }
}
