import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { COGNITO_ROLES } from './create-user.dto.js';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'usuario@puntoeco.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Usuario PuntoEco' })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  name?: string;

  @ApiPropertyOptional({ example: '+5491112345678' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @ApiPropertyOptional({
    example: ['MANAGER'],
    enum: COGNITO_ROLES,
    isArray: true,
    description: 'Reemplaza completamente los roles actuales del usuario',
  })
  @IsOptional()
  @IsArray()
  @IsIn(COGNITO_ROLES, { each: true })
  roles?: string[];
}
