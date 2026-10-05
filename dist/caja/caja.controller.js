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
import { Body, Controller, Delete, Get, Param, Post, Query, } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/auth.decorators.js';
import { CajaService } from './caja.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
let CajaController = class CajaController {
    cajaService;
    constructor(cajaService) {
        this.cajaService = cajaService;
    }
    getCaja() {
        return this.cajaService.getCaja();
    }
    getSummary(from, to) {
        return this.cajaService.getSummary(from, to);
    }
    getExpenses(from, to) {
        return this.cajaService.getExpenses(from, to);
    }
    addExpense(dto) {
        return this.cajaService.addExpense(dto.description, dto.amount);
    }
    removeExpense(id) {
        return this.cajaService.removeExpense(id);
    }
};
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "getCaja", null);
__decorate([
    Get('summary'),
    __param(0, Query('from')),
    __param(1, Query('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "getSummary", null);
__decorate([
    Get('expenses'),
    __param(0, Query('from')),
    __param(1, Query('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "getExpenses", null);
__decorate([
    Post('expenses'),
    Roles('ADMIN', 'MANAGER'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateExpenseDto]),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "addExpense", null);
__decorate([
    Delete('expenses/:id'),
    Roles('ADMIN', 'MANAGER'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CajaController.prototype, "removeExpense", null);
CajaController = __decorate([
    ApiTags('caja'),
    ApiBearerAuth(),
    Controller('caja'),
    __metadata("design:paramtypes", [CajaService])
], CajaController);
export { CajaController };
//# sourceMappingURL=caja.controller.js.map