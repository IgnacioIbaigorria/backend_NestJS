import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PaymentDto {
  @ApiProperty({ example: 3000, minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'transferencia', enum: ['efectivo', 'qr', 'transferencia', 'credito', 'debito'] })
  @IsIn(['efectivo', 'qr', 'transferencia', 'credito', 'debito'])
  @IsNotEmpty()
  paymentMethod: string;
}

export class CreateSaleDto {
  @ApiProperty({ example: 'uuid-de-producto' })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ type: [PaymentDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PaymentDto)
  payments?: PaymentDto[];
}
