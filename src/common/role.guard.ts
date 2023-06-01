import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from './token-payload.type';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly role: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    return (user as TokenPayload).role === this.role;
  }
}
