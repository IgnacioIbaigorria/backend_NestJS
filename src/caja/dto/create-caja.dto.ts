import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCajaDto {
  @ApiProperty({ example: 100.0, minimum: 0 })
  @IsNumber()
  @Min(0)
  openingBalance: number;
}
