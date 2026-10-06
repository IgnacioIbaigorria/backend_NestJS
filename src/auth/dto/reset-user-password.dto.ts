import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class ResetUserPasswordDto {
  @ApiProperty({ example: 'NuevaClaveSegura1!', minLength: 8, maxLength: 99 })
  @IsString()
  @IsNotEmpty()
  @Length(8, 99)
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
}
