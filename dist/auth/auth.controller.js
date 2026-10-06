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
import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CognitoBffService } from './cognito-bff.service.js';
import { Public } from './auth.decorators.js';
class LoginDto {
    username;
    password;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class RefreshDto {
    refreshToken;
    username;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RefreshDto.prototype, "refreshToken", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], RefreshDto.prototype, "username", void 0);
const REFRESH_COOKIE = 'bodega_refresh';
const REFRESH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const REFRESH_COOKIE_BASE = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/auth',
};
const REFRESH_COOKIE_SET = {
    ...REFRESH_COOKIE_BASE,
    maxAge: REFRESH_COOKIE_MAX_AGE,
};
let AuthController = class AuthController {
    cognitoBffService;
    constructor(cognitoBffService) {
        this.cognitoBffService = cognitoBffService;
    }
    async login(dto, res) {
        const { accessToken, refreshToken, expiresIn, tokenType } = await this.cognitoBffService.login(dto.username, dto.password);
        res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_SET);
        return { accessToken, expiresIn, tokenType };
    }
    async refresh(dto, req, res) {
        const refreshToken = req.cookies?.[REFRESH_COOKIE] ?? dto.refreshToken;
        if (!refreshToken) {
            res.clearCookie(REFRESH_COOKIE, REFRESH_COOKIE_BASE);
            throw new UnauthorizedException('La sesión expiró');
        }
        try {
            const { accessToken, refreshToken: rotated, expiresIn, tokenType } = await this.cognitoBffService.refreshToken(refreshToken, dto.username);
            res.cookie(REFRESH_COOKIE, rotated, REFRESH_COOKIE_SET);
            return { accessToken, expiresIn, tokenType };
        }
        catch (error) {
            res.clearCookie(REFRESH_COOKIE, REFRESH_COOKIE_BASE);
            throw error;
        }
    }
    logout(res) {
        res.clearCookie(REFRESH_COOKIE, REFRESH_COOKIE_BASE);
        return { ok: true };
    }
};
__decorate([
    Public(),
    Post('login'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Iniciar sesión con usuario y contraseña' }),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Public(),
    Post('refresh'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Renovar access token a partir de la cookie de refresh' }),
    __param(0, Body()),
    __param(1, Req()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    Public(),
    Post('logout'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Cerrar sesión eliminando la cookie de refresh' }),
    __param(0, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    ApiTags('auth'),
    Controller('auth'),
    __metadata("design:paramtypes", [CognitoBffService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map