var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsIn, IsArray, IsString, Length, Matches, MaxLength, } from 'class-validator';
export const COGNITO_ROLES = [
    'ADMIN',
    'MANAGER',
    'SELLER',
    'INVENTORY_MANAGER',
    'AUDITOR',
];
export class CreateUserDto {
    username;
    password;
    email;
    name;
    phoneNumber;
    roles;
}
__decorate([
    ApiProperty({ example: 'vendedor01' }),
    IsString(),
    IsNotEmpty(),
    Length(1, 128),
    Matches(/^[\w+=,.@-]+$/, {
        message: 'username contiene caracteres no permitidos por Cognito',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    ApiProperty({
        example: 'UnaClaveSegura1!',
        minLength: 8,
        maxLength: 99,
    }),
    IsString(),
    IsNotEmpty(),
    Length(8, 99),
    Matches(/\S/, { message: 'password no puede contener solo espacios' }),
    Matches(/[A-Z]/, {
        message: 'password debe contener al menos una letra mayúscula',
    }),
    Matches(/[a-z]/, {
        message: 'password debe contener al menos una letra minúscula',
    }),
    Matches(/[0-9]/, { message: 'password debe contener al menos un número' }),
    Matches(/[^\w\s]/, {
        message: 'password debe contener al menos un carácter especial',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    ApiPropertyOptional({ example: 'vendedor01@puntoeco.com' }),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Vendedor PuntoEco' }),
    IsOptional(),
    IsString(),
    MaxLength(2048),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: '+5491112345678' }),
    IsOptional(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    ApiPropertyOptional({
        example: ['SELLER'],
        enum: COGNITO_ROLES,
        isArray: true,
    }),
    IsOptional(),
    IsArray(),
    IsIn(COGNITO_ROLES, { each: true }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "roles", void 0);
//# sourceMappingURL=create-user.dto.js.map