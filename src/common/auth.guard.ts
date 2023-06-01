import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractToken(authHeaderValue: string): string | undefined {
    const [type, token] = authHeaderValue.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      try {
        const payload = this.jwtService.verify<TokenPayload>(
          this.extractToken(request.headers.authorization),
        );

        if (payload) {
          request.user = payload;
          return true;
        }

        return false;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
}
