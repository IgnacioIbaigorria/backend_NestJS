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
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from './auth.decorators.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.service.js';
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(dto) {
        return this.usersService.create(dto);
    }
    findAll(limit, nextToken) {
        if (limit !== undefined && (limit < 1 || limit > 60)) {
            throw new BadRequestException('limit debe estar entre 1 y 60');
        }
        return this.usersService.findAll(limit, nextToken);
    }
    findOne(username) {
        return this.usersService.findOne(username);
    }
    update(username, dto) {
        return this.usersService.update(username, dto);
    }
    resetPassword(username, dto) {
        return this.usersService.resetPassword(username, dto);
    }
    remove(username) {
        return this.usersService.remove(username);
    }
};
__decorate([
    Post(),
    ApiOperation({ summary: 'Crear usuario en Cognito' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    Get(),
    ApiOperation({ summary: 'Listar usuarios de Cognito' }),
    __param(0, Query('limit', new ParseIntPipe({ optional: true }))),
    __param(1, Query('nextToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    Get(':username'),
    ApiOperation({ summary: 'Consultar un usuario de Cognito' }),
    __param(0, Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    Patch(':username'),
    ApiOperation({ summary: 'Actualizar atributos o estado del usuario' }),
    __param(0, Param('username')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    Post(':username/password'),
    ApiOperation({ summary: 'Restablecer contraseña de usuario' }),
    __param(0, Param('username')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ResetUserPasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resetPassword", null);
__decorate([
    Delete(':username'),
    ApiOperation({ summary: 'Eliminar usuario de Cognito' }),
    __param(0, Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    ApiTags('users'),
    ApiBearerAuth(),
    Roles('ADMIN'),
    Controller('users'),
    __metadata("design:paramtypes", [UsersService])
], UsersController);
export { UsersController };
//# sourceMappingURL=users.controller.js.map