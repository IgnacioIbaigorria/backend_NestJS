import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
  tokenType: string;
}

@Injectable()
export class CognitoBffService {
  private readonly logger = new Logger(CognitoBffService.name);
  private readonly client: CognitoIdentityProviderClient;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor() {
    this.clientId = process.env.COGNITO_CLIENT_ID ?? '';
    this.clientSecret = process.env.COGNITO_CLIENT_SECRET ?? '';

    if (!this.clientId || !this.clientSecret) {
      throw new Error(
        'COGNITO_CLIENT_ID y COGNITO_CLIENT_SECRET son obligatorios',
      );
    }

    this.client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION ?? 'us-east-1',
    });
  }

  /**
   * Calcula SECRET_HASH requerido por Cognito cuando el App Client tiene client secret.
   * HMAC-SHA256(client_secret, username + client_id) en base64.
   */
  private computeSecretHash(username: string): string {
    return createHmac('sha256', this.clientSecret)
      .update(username + this.clientId)
      .digest('base64');
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const params: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.computeSecretHash(username),
      },
    };

    try {
      const command = new InitiateAuthCommand(params);
      const response: InitiateAuthCommandOutput = await this.client.send(command);

      if (!response.AuthenticationResult) {
        throw new UnauthorizedException('Autenticación fallida');
      }

      const { AccessToken, RefreshToken, IdToken, ExpiresIn, TokenType } =
        response.AuthenticationResult;

      if (!AccessToken || !RefreshToken || !IdToken) {
        throw new UnauthorizedException('Tokens no recibidos de Cognito');
      }

      return {
        accessToken: AccessToken,
        refreshToken: RefreshToken,
        idToken: IdToken,
        expiresIn: ExpiresIn ?? 3600,
        tokenType: TokenType ?? 'Bearer',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error(
        `Login fallido para '${username}': ${error instanceof Error ? error.message : JSON.stringify(error)}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  async refreshToken(
    refreshToken: string,
    username: string,
  ): Promise<LoginResponse> {
    const params: InitiateAuthCommandInput = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: this.computeSecretHash(username),
      },
    };

    try {
      const command = new InitiateAuthCommand(params);
      const response: InitiateAuthCommandOutput = await this.client.send(command);

      if (!response.AuthenticationResult) {
        throw new UnauthorizedException('Refresh fallido');
      }

      const { AccessToken, IdToken, ExpiresIn, TokenType } =
        response.AuthenticationResult;

      if (!AccessToken || !IdToken) {
        throw new UnauthorizedException('Tokens no recibidos de Cognito');
      }

      return {
        accessToken: AccessToken,
        refreshToken: refreshToken,
        idToken: IdToken,
        expiresIn: ExpiresIn ?? 3600,
        tokenType: TokenType ?? 'Bearer',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
}
