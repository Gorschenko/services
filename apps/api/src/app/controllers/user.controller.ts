import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserId } from '../guards/user.decorator';

@Controller('user')
export class UserController {
    constructor() {}

    @UseGuards(JwtAuthGuard)
    @Post('info')
    async info(@UserId() userId: string) {
    }
}

