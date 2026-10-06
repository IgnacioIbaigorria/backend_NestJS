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
import { ReposicionService } from './reposicion.service.js';
import { CreateReposicionDto } from './dto/create-reposicion.dto.js';
let ReposicionController = class ReposicionController {
    reposicionService;
    constructor(reposicionService) {
        this.reposicionService = reposicionService;
    }
    create(dto) {
        return this.reposicionService.create(dto);
    }
    findAll(productId) {
        return this.reposicionService.findAll({ productId });
    }
    findOne(id) {
        return this.reposicionService.findOne(id);
    }
};
__decorate([
    Post(),
    Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateReposicionDto]),
    __metadata("design:returntype", void 0)
], ReposicionController.prototype, "create", null);
__decorate([
    Get(),
    Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER', 'GUEST'),
    __param(0, Query('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReposicionController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER', 'GUEST'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReposicionController.prototype, "findOne", null);
ReposicionController = __decorate([
    ApiTags('reposicion'),
    ApiBearerAuth(),
    Controller('reposicion'),
    __metadata("design:paramtypes", [ReposicionService])
], ReposicionController);
export { ReposicionController };
//# sourceMappingURL=reposicion.controller.js.map