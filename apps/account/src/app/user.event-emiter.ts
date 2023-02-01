import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from './user/entities/user.entity';

@Injectable()
export class UserEventEmiter {
    constructor(
        private readonly rmqService: RMQService
    ) {}

    async handle (user: UserEntity) {
        for (const event of user.events) {
            await this.rmqService.notify(event.topic, event.data)
        }
    }
}