import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import type { CognitoUser } from './auth.types.js';

type CognitoAccessTokenPayload = {
  sub: string;
  username?: string;
  client_id: string;
  token_use: 'access';
  scope?: string;
  'cognito:groups'?: string[];
};

@Injectable()
export class CognitoService {
  private readonly verifier: ReturnType<typeof CognitoJwtVerifier.create>;

  constructor() {
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    const clientId = process.env.COGNITO_CLIENT_ID;

    if (!userPoolId || !clientId) {
      throw new Error(
        'COGNITO_USER_POOL_ID y COGNITO_CLIENT_ID son obligatorios',
      );
    }

    this.verifier = CognitoJwtVerifier.create({
      userPoolId,
      clientId,
      tokenUse: 'access',
    });
  }

  async verifyAccessToken(token: string): Promise<CognitoUser> {
    try {
      const payload = (await this.verifier.verify(
        token,
      )) as unknown as CognitoAccessTokenPayload;

      return {
        sub: payload.sub,
        username: payload.username,
        client_id: payload.client_id,
        token_use: payload.token_use,
        scope: payload.scope,
        groups: payload['cognito:groups'] ?? [],
      };
    } catch {
      throw new UnauthorizedException('Token de Cognito inválido o expirado');
    }
  }
}
