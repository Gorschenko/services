import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCommands } from './controllers/user.commands';
import { UserEventEmiter } from './controllers/user.event-emiter';
import { UserQueries } from './controllers/user.queries';
import { UserService } from './user.service';
import { User, UserSchema } from '@services/database';
import { UserRepository } from './user.repository';

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
