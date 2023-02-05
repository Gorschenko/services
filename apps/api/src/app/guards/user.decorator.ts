import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from '@services/interfaces';

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IJwtPayload => {
        return ctx.switchToHttp().getRequest().user
    }
)
