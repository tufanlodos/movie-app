import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from './token-payload.type';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return (request.user as TokenPayload) ?? undefined;
  },
);
