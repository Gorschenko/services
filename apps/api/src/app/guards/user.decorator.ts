import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): string => {
        return ctx.switchToHttp().getRequest().user
    }
)
