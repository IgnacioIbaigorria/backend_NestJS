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
let ReposicionService = class ReposicionService {
    prisma;
    cacheManager;
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async create(dto) {
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });
        if (!product) {
            throw new NotFoundException(`Producto ${dto.productId} no encontrado`);
        }
        const [reposicion] = await this.prisma.$transaction([
            this.prisma.reposicion.create({ data: dto }),
            this.prisma.product.update({
                where: { id: dto.productId },
                data: { stock: { increment: dto.quantity } },
            }),
        ]);
        await this.cacheManager.del(`products:${dto.productId}`);
        await this.cacheManager.del('products:list:all:all');
        await this.cacheManager.del('products:low-stock');
        await this.cacheManager.del('reposicion:list:all');
        return reposicion;
    }
    async findAll(filters) {
        const cacheKey = `reposicion:list:${filters?.productId ?? 'all'}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const reposiciones = await this.prisma.reposicion.findMany({
            where: { productId: filters?.productId },
            include: { product: true },
            orderBy: { createdAt: 'desc' },
        });
        await this.cacheManager.set(cacheKey, reposiciones, 60000);
        return reposiciones;
    }
    async findOne(id) {
        const cacheKey = `reposicion:${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const reposicion = await this.prisma.reposicion.findUnique({
            where: { id },
            include: { product: true },
        });
        if (!reposicion) {
            throw new NotFoundException(`Reposición ${id} no encontrada`);
        }
        await this.cacheManager.set(cacheKey, reposicion, 60000);
        return reposicion;
    }
};
ReposicionService = __decorate([
    Injectable(),
    __param(1, Inject('CACHE_MANAGER')),
    __metadata("design:paramtypes", [PrismaService, Object])
], ReposicionService);
export { ReposicionService };
//# sourceMappingURL=reposicion.service.js.map