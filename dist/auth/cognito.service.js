var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
let CognitoService = class CognitoService {
    verifier;
    constructor() {
        const userPoolId = process.env.COGNITO_USER_POOL_ID;
        const clientId = process.env.COGNITO_CLIENT_ID;
        if (!userPoolId || !clientId) {
            throw new Error('COGNITO_USER_POOL_ID y COGNITO_CLIENT_ID son obligatorios');
        }
        this.verifier = CognitoJwtVerifier.create({
            userPoolId,
            clientId,
            tokenUse: 'access',
        });
    }
    async verifyAccessToken(token) {
        try {
            const payload = (await this.verifier.verify(token));
            return {
                sub: payload.sub,
                username: payload.username,
                client_id: payload.client_id,
                token_use: payload.token_use,
                scope: payload.scope,
                groups: payload['cognito:groups'] ?? [],
            };
        }
        catch {
            throw new UnauthorizedException('Token de Cognito inválido o expirado');
        }
    }
};
CognitoService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], CognitoService);
export { CognitoService };
//# sourceMappingURL=cognito.service.js.map