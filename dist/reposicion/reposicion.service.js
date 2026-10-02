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
let ReposicionService = class ReposicionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
        return reposicion;
    }
    findAll(filters) {
        return this.prisma.reposicion.findMany({
            where: { productId: filters?.productId },
            include: { product: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const reposicion = await this.prisma.reposicion.findUnique({
            where: { id },
            include: { product: true },
        });
        if (!reposicion) {
            throw new NotFoundException(`Reposición ${id} no encontrada`);
        }
        return reposicion;
    }
};
ReposicionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ReposicionService);
export { ReposicionService };
//# sourceMappingURL=reposicion.service.js.map