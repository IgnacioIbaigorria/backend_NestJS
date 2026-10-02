var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsUUID, Min, ValidateNested, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
class PaymentDto {
    amount;
    paymentMethod;
}
__decorate([
    ApiProperty({ example: 3000, minimum: 0 }),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], PaymentDto.prototype, "amount", void 0);
__decorate([
    ApiProperty({ example: 'transferencia', enum: ['efectivo', 'qr', 'transferencia', 'credito', 'debito'] }),
    IsIn(['efectivo', 'qr', 'transferencia', 'credito', 'debito']),
    IsNotEmpty(),
    __metadata("design:type", String)
], PaymentDto.prototype, "paymentMethod", void 0);
export class CreateSaleDto {
    productId;
    quantity;
    payments;
}
__decorate([
    ApiProperty({ example: 'uuid-de-producto' }),
    IsUUID(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateSaleDto.prototype, "productId", void 0);
__decorate([
    ApiProperty({ example: 2, minimum: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateSaleDto.prototype, "quantity", void 0);
__decorate([
    ApiPropertyOptional({ type: [PaymentDto] }),
    IsArray(),
    ArrayMinSize(1),
    ValidateNested({ each: true }),
    Type(() => PaymentDto),
    __metadata("design:type", Array)
], CreateSaleDto.prototype, "payments", void 0);
//# sourceMappingURL=create-sale.dto.js.map