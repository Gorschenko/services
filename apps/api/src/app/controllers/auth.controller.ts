import { Body, Controller, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@services/contracts'
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dtos/auth/login.dto';
import { RegisterDto } from '../dtos/auth/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly rmqService: RMQService,
    ) {}

    @UsePipes(ValidationPipe)
    @Post('register')
    async register(@Body() dto: RegisterDto): Promise<AccountRegister.Response> {
        try {
            return this.rmqService.send<AccountRegister.Request, AccountRegister.Response>(AccountRegister.topic, dto)
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message)
            }
        }
    }

    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Body() dto: LoginDto): Promise<AccountLogin.Response> {
        try {
            return this.rmqService.send<AccountLogin.Request, AccountLogin.Response>(AccountLogin.topic, dto)
        } catch (e) {
            if (e instanceof Error) {
                throw new UnauthorizedException(e.message)
            }
        }
    }
}

