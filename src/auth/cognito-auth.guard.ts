import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { CognitoService } from './cognito.service.js';
import type { CognitoUser } from './auth.types.js';
import { IS_PUBLIC_KEY } from './auth.decorators.js';
import { Reflector } from '@nestjs/core';

type AuthenticatedRequest = Request & { user?: CognitoUser };

@Injectable()
export class CognitoAuthGuard implements CanActivate {
  constructor(
    private readonly cognitoService: CognitoService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

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
