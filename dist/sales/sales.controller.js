var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Post, Query, } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/auth.decorators.js';
import { SalesService } from './sales.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
let SalesController = class SalesController {
    salesService;
    constructor(salesService) {
        this.salesService = salesService;
    }
    create(dto) {
        return this.salesService.create(dto);
    }
    findAll(productId, from, to) {
        return this.salesService.findAll({ productId, from, to });
    }
    getSummary(from, to) {
        return this.salesService.getSummary(from, to);
    }
    findOne(id) {
        return this.salesService.findOne(id);
    }
};
__decorate([
    Post(),
    Roles('ADMIN', 'MANAGER', 'SELLER'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSaleDto]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query('productId')),
    __param(1, Query('from')),
    __param(2, Query('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findAll", null);
__decorate([
    Get('summary'),
    __param(0, Query('from')),
    __param(1, Query('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "getSummary", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalesController.prototype, "findOne", null);
SalesController = __decorate([
    ApiTags('sales'),
    ApiBearerAuth(),
    Controller('sales'),
    __metadata("design:paramtypes", [SalesService])
], SalesController);
export { SalesController };
//# sourceMappingURL=sales.controller.js.map