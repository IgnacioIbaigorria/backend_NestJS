import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Compra de suministros' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 50.0, minimum: 0 })
  @IsNumber()
  @Min(0)
  amount: number;
}
