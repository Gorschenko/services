import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCommands } from '../user.commands';
import { UserEventEmiter } from '../user.event-emiter';
import { UserQueries } from '../user.queries';
import { UserService } from '../user.service';
import { User, UserSchema } from './models/user.model';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ])
  ],
  providers: [UserRepository, UserEventEmiter, UserService],
  exports: [UserRepository],
  controllers: [UserCommands, UserQueries],
})
export class UserModule {}
