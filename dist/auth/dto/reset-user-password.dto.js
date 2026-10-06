var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
export class ResetUserPasswordDto {
    password;
}
__decorate([
    ApiProperty({ example: 'NuevaClaveSegura1!', minLength: 8, maxLength: 99 }),
    IsString(),
    IsNotEmpty(),
    Length(8, 99),
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
], ResetUserPasswordDto.prototype, "password", void 0);
//# sourceMappingURL=reset-user-password.dto.js.map