import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsArray,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export const COGNITO_ROLES = [
  'ADMIN',
  'MANAGER',
  'SELLER',
  'INVENTORY_MANAGER',
  'AUDITOR',
] as const;

export class CreateUserDto {
  @ApiProperty({ example: 'vendedor01' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 128)
  @Matches(/^[\w+=,.@-]+$/, {
    message: 'username contiene caracteres no permitidos por Cognito',
  })
  username: string;

  @ApiProperty({
    example: 'UnaClaveSegura1!',
    minLength: 8,
    maxLength: 99,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 99)
  @Matches(/\S/, { message: 'password no puede contener solo espacios' })
  @Matches(/[A-Z]/, {
    message: 'password debe contener al menos una letra mayúscula',
  })
  @Matches(/[a-z]/, {
    message: 'password debe contener al menos una letra minúscula',
  })
  @Matches(/[0-9]/, { message: 'password debe contener al menos un número' })
  @Matches(/[^\w\s]/, {
    message: 'password debe contener al menos un carácter especial',
  })
  password: string;

  @ApiPropertyOptional({ example: 'vendedor01@puntoeco.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Vendedor PuntoEco' })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  name?: string;

  @ApiPropertyOptional({ example: '+5491112345678' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: ['SELLER'],
    enum: COGNITO_ROLES,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsIn(COGNITO_ROLES, { each: true })
  roles?: string[];
}
