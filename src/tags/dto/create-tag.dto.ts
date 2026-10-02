import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ example: 'Oferta' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
