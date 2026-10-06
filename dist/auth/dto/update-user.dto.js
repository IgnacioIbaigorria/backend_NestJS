var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsIn, IsOptional, IsString, MaxLength, } from 'class-validator';
import { COGNITO_ROLES } from './create-user.dto.js';
export class UpdateUserDto {
    email;
    name;
    phoneNumber;
    enabled;
    roles;
}
__decorate([
    ApiPropertyOptional({ example: 'usuario@puntoeco.com' }),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Usuario PuntoEco' }),
    IsOptional(),
    IsString(),
    MaxLength(2048),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: '+5491112345678' }),
    IsOptional(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    ApiPropertyOptional({ example: true }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "enabled", void 0);
__decorate([
    ApiPropertyOptional({
        example: ['MANAGER'],
        enum: COGNITO_ROLES,
        isArray: true,
        description: 'Reemplaza completamente los roles actuales del usuario',
    }),
    IsOptional(),
    IsArray(),
    IsIn(COGNITO_ROLES, { each: true }),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "roles", void 0);
//# sourceMappingURL=update-user.dto.js.map