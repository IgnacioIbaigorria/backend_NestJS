var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.product.findUnique({
            where: { name: dto.name },
        });
        if (existing) {
            throw new ConflictException(`Ya existe un producto con el nombre "${dto.name}"`);
        }
        return this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                costPrice: dto.costPrice ?? 0,
                stock: dto.stock ?? 0,
                minStock: dto.minStock ?? 5,
                categoryId: dto.categoryId ?? null,
                tags: dto.tagIds
                    ? { connect: dto.tagIds.map((id) => ({ id })) }
                    : undefined,
            },
            include: { category: true, tags: true },
        });
    }
    findAll(filters) {
        return this.prisma.product.findMany({
            where: {
                categoryId: filters?.categoryId,
                OR: filters?.search
                    ? [
                        { name: { contains: filters.search, mode: 'insensitive' } },
                    ]
                    : undefined,
            },
            include: { category: true, tags: true },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true, tags: true },
        });
        if (!product)
            throw new NotFoundException(`Producto ${id} no encontrado`);
        return product;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.product.update({
            where: { id },
            data: {
                ...dto,
                tags: dto.tagIds
                    ? { set: dto.tagIds.map((tagId) => ({ id: tagId })) }
                    : undefined,
            },
            include: { category: true, tags: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.delete({ where: { id } });
    }
    findLowStock() {
        return this.prisma.product.findMany({
            where: { stock: { lte: 5 } },
            include: { category: true },
            orderBy: { name: 'asc' },
        });
    }
};
ProductsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map