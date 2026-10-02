import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CloseCajaDto {
  @ApiProperty({ example: 500.0, minimum: 0 })
  @IsNumber()
  @Min(0)
  closingBalance: number;
}
