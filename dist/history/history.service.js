var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let HistoryService = class HistoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logChange(productId, field, oldValue, newValue, changedBy) {
        return this.prisma.productHistory.create({
            data: { productId, field, oldValue, newValue, changedBy },
        });
    }
    findAll(filters) {
        return this.prisma.productHistory.findMany({
            where: {
                productId: filters?.productId,
                field: filters?.field,
            },
            include: { product: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const entry = await this.prisma.productHistory.findUnique({
            where: { id },
            include: { product: true },
        });
        if (!entry)
            throw new NotFoundException(`Historial ${id} no encontrado`);
        return entry;
    }
};
HistoryService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], HistoryService);
export { HistoryService };
//# sourceMappingURL=history.service.js.map