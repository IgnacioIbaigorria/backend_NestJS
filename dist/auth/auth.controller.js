var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CognitoBffService } from './cognito-bff.service.js';
class LoginDto {
    username;
    password;
}
class RefreshDto {
    refreshToken;
}
let AuthController = class AuthController {
    cognitoBffService;
    constructor(cognitoBffService) {
        this.cognitoBffService = cognitoBffService;
    }
    async login(dto) {
        return this.cognitoBffService.login(dto.username, dto.password);
    }
    async refresh(dto) {
        return this.cognitoBffService.refreshToken(dto.refreshToken);
    }
};
__decorate([
    Post('login'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Iniciar sesión con usuario y contraseña' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('refresh'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Renovar access token con refresh token' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    ApiTags('auth'),
    Controller('auth'),
    __metadata("design:paramtypes", [CognitoBffService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map