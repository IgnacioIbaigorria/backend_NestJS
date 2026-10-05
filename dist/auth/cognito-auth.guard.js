var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { CognitoService } from './cognito.service.js';
let CognitoAuthGuard = class CognitoAuthGuard {
    cognitoService;
    constructor(cognitoService) {
        this.cognitoService = cognitoService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
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
};
CognitoAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [CognitoService])
], CognitoAuthGuard);
export { CognitoAuthGuard };
//# sourceMappingURL=cognito-auth.guard.js.map