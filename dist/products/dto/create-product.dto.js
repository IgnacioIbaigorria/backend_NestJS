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
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min, } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateProductDto {
    name;
    description;
    price;
    costPrice;
    stock;
    minStock;
    categoryId;
    tagIds;
}
__decorate([
    ApiProperty({ example: 'Laptop HP 15"' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Laptop de 15 pulgadas, 8GB RAM' }),
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    ApiProperty({ example: 999.99, description: 'Precio de venta' }),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    ApiPropertyOptional({ example: 500.0, description: 'Precio de costo' }),
    Type(() => Number),
    IsNumber(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "costPrice", void 0);
__decorate([
    ApiProperty({ example: 10, default: 0 }),
    Type(() => Number),
    IsInt(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "stock", void 0);
__decorate([
    ApiProperty({ example: 5, default: 5 }),
    Type(() => Number),
    IsInt(),
    Min(0),
    IsOptional(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "minStock", void 0);
__decorate([
    ApiPropertyOptional({ example: 'uuid-de-categoria' }),
    IsUUID(),
    IsOptional(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoryId", void 0);
__decorate([
    ApiPropertyOptional({ example: ['uuid-de-etiqueta'] }),
    IsArray(),
    IsUUID('4', { each: true }),
    IsOptional(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "tagIds", void 0);
//# sourceMappingURL=create-product.dto.js.map