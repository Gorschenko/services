import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '@services/interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate({ id }: IJwtPayload): Promise<string> {
        return id
    }
}
