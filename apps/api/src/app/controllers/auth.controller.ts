import { Body, Controller, Post } from '@nestjs/common';
import { AccountLogin, AccountRegister } from '@services/contracts'

@Controller('auth')
export class AuthController {
    constructor() {}

    @Post('register')
    async register(@Body() dto: AccountRegister.Request) {
    }

    @Post('login')
    async login(@Body() { email, password }: AccountLogin.Request) {
    }
}

