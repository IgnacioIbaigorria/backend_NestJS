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
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let HistoryService = class HistoryService {
    prisma;
    cacheManager;
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async logChange(productId, field, oldValue, newValue, changedBy) {
        const result = await this.prisma.productHistory.create({
            data: { productId, field, oldValue, newValue, changedBy },
        });
        await this.cacheManager.del('history:list:all:all');
        await this.cacheManager.del(`history:list:${productId}:all`);
        return result;
    }
    async findAll(filters) {
        const cacheKey = `history:list:${filters?.productId ?? 'all'}:${filters?.field ?? 'all'}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const history = await this.prisma.productHistory.findMany({
            where: {
                productId: filters?.productId,
                field: filters?.field,
            },
            include: { product: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
        await this.cacheManager.set(cacheKey, history, 60000);
        return history;
    }
    async findOne(id) {
        const cacheKey = `history:${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const entry = await this.prisma.productHistory.findUnique({
            where: { id },
            include: { product: true },
        });
        if (!entry)
            throw new NotFoundException(`Historial ${id} no encontrado`);
        await this.cacheManager.set(cacheKey, entry, 60000);
        return entry;
    }
};
HistoryService = __decorate([
    Injectable(),
    __param(1, Inject('CACHE_MANAGER')),
    __metadata("design:paramtypes", [PrismaService, Object])
], HistoryService);
export { HistoryService };
//# sourceMappingURL=history.service.js.map