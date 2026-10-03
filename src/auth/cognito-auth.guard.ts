import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { CognitoService } from './cognito.service.js';
import type { CognitoUser } from './auth.types.js';

type AuthenticatedRequest = Request & { user?: CognitoUser };

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  constructor(private readonly cognitoService: CognitoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bearer token requerido');
    }

    const token = authorization.slice('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException('Bearer token requerido');
    }

    request.user = await this.cognitoService.verifyAccessToken(token);
    return true;
  }
}
