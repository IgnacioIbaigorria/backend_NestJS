var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CognitoBffService_1;
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CognitoIdentityProviderClient, InitiateAuthCommand, } from '@aws-sdk/client-cognito-identity-provider';
let CognitoBffService = CognitoBffService_1 = class CognitoBffService {
    logger = new Logger(CognitoBffService_1.name);
    client;
    clientId;
    clientSecret;
    constructor() {
        this.clientId = process.env.COGNITO_CLIENT_ID ?? '';
        this.clientSecret = process.env.COGNITO_CLIENT_SECRET ?? '';
        if (!this.clientId || !this.clientSecret) {
            throw new Error('COGNITO_CLIENT_ID y COGNITO_CLIENT_SECRET son obligatorios');
        }
        this.client = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION ?? 'us-east-1',
        });
    }
    async login(username, password) {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: this.clientId,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
        };
        try {
            const command = new InitiateAuthCommand(params);
            const response = await this.client.send(command);
            if (!response.AuthenticationResult) {
                throw new UnauthorizedException('Autenticación fallida');
            }
            const { AccessToken, RefreshToken, IdToken, ExpiresIn, TokenType } = response.AuthenticationResult;
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
        }
        catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            this.logger.error(`Login fallido para '${username}': ${error instanceof Error ? error.message : JSON.stringify(error)}`, error instanceof Error ? error.stack : undefined);
            throw new UnauthorizedException('Credenciales inválidas');
        }
    }
    async refreshToken(refreshToken) {
        const params = {
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            ClientId: this.clientId,
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
            },
        };
        try {
            const command = new InitiateAuthCommand(params);
            const response = await this.client.send(command);
            if (!response.AuthenticationResult) {
                throw new UnauthorizedException('Refresh fallido');
            }
            const { AccessToken, IdToken, ExpiresIn, TokenType } = response.AuthenticationResult;
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
        }
        catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException('Refresh token inválido o expirado');
        }
    }
};
CognitoBffService = CognitoBffService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], CognitoBffService);
export { CognitoBffService };
//# sourceMappingURL=cognito-bff.service.js.map