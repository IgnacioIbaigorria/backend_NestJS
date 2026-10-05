import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async login(username: string, password: string): Promise<LoginResponse> {
    const params: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
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
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const params: InitiateAuthCommandInput = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
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
