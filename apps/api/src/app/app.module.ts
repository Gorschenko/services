import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJWTConfig } from './configs/jwt.config';
import { getRMQConfig } from './configs/rmq.config';
import { AuthController } from './controllers/auth.controller';
import { CourseController } from './controllers/course.controller';
import { ReviewController } from './controllers/review.contoller';
import { UserController } from './controllers/user.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [
    AuthController,
    UserController,
    CourseController,
    ReviewController,
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'envs/.api.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule,
    RMQModule.forRootAsync(getRMQConfig()),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
