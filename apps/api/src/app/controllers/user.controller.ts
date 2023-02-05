import { 
    BadRequestException,
    Body,
    Controller,
    Get,
    UnauthorizedException,
    UseGuards,
    ValidationPipe,
    UsePipes,
    Put,
} from '@nestjs/common';
import { AccountChangeProfile, AccountUserCourses, AccountUserInfo } from '@services/contracts';
import { IUser } from '@services/interfaces';
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
    async getUser(@UserId() id: string): Promise<AccountUserInfo.Response> {
        try {
            return this.rmqService.send<AccountUserInfo.Request, AccountUserInfo.Response>(AccountUserInfo.topic, { id })
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message)
            }
        }
    }


    @Get('courses')
    async getCourses(@UserId() id: string): Promise<AccountUserCourses.Response> {
        try {
            return this.rmqService.send<AccountUserCourses.Request, AccountUserCourses.Response>(AccountUserCourses.topic, { id })
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message)
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Put()
    async changeProfile(@Body() { displayName }: Pick<IUser, 'displayName'>, @UserId() id: string ): Promise<AccountChangeProfile.Response> {
        try {
            return this.rmqService.send<AccountChangeProfile.Request, AccountChangeProfile.Response>(AccountChangeProfile.topic, { id, displayName })
        } catch (e) {
            if (e instanceof Error) {
                throw new BadRequestException(e.message)
            }
        }
    }
}
