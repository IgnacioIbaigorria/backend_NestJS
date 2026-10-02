import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReposicionDto {
  @ApiProperty({ example: 'uuid-de-producto' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 50, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ example: 'Proveedor XYZ' })
  @IsString()
  @IsOptional()
  supplier?: string;

  @ApiPropertyOptional({ example: 500.0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  cost?: number;
}
