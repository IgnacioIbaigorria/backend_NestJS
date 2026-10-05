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
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ProductsService = class ProductsService {
    prisma;
    cacheManager;
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async create(dto) {
        const existing = await this.prisma.product.findUnique({
            where: { name: dto.name },
        });
        if (existing) {
            throw new ConflictException(`Ya existe un producto con el nombre "${dto.name}"`);
        }
        const product = await this.prisma.product.create({
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
        await this.cacheManager.del('products:list:all:all');
        return product;
    }
    async findAll(filters) {
        const cacheKey = `products:list:${filters?.categoryId ?? 'all'}:${filters?.search ?? 'all'}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const products = await this.prisma.product.findMany({
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
        await this.cacheManager.set(cacheKey, products, 60000);
        return products;
    }
    async findOne(id) {
        const cacheKey = `products:${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true, tags: true },
        });
        if (!product)
            throw new NotFoundException(`Producto ${id} no encontrado`);
        await this.cacheManager.set(cacheKey, product, 60000);
        return product;
    }
    async update(id, dto) {
        const { categoryId, tagIds, ...rest } = dto;
        const result = await this.prisma.$transaction(async (tx) => {
            const currentProduct = await tx.product.findUnique({
                where: { id },
                include: { tags: { select: { id: true } } },
            });
            if (!currentProduct) {
                throw new NotFoundException(`Producto ${id} no encontrado`);
            }
            const updatedProduct = await tx.product.update({
                where: { id },
                data: {
                    ...rest,
                    category: categoryId !== undefined
                        ? categoryId === null
                            ? { disconnect: true }
                            : { connect: { id: categoryId } }
                        : undefined,
                    tags: tagIds !== undefined
                        ? { set: tagIds.map((tagId) => ({ id: tagId })) }
                        : undefined,
                },
                include: { category: true, tags: true },
            });
            const oldTags = currentProduct.tags
                .map((tag) => tag.id)
                .sort()
                .join(',');
            const newTags = updatedProduct.tags
                .map((tag) => tag.id)
                .sort()
                .join(',');
            const possibleChanges = [
                ['name', currentProduct.name, updatedProduct.name],
                ['description', currentProduct.description, updatedProduct.description],
                ['price', currentProduct.price.toString(), updatedProduct.price.toString()],
                [
                    'costPrice',
                    currentProduct.costPrice.toString(),
                    updatedProduct.costPrice.toString(),
                ],
                ['stock', String(currentProduct.stock), String(updatedProduct.stock)],
                [
                    'minStock',
                    String(currentProduct.minStock),
                    String(updatedProduct.minStock),
                ],
                ['categoryId', currentProduct.categoryId, updatedProduct.categoryId],
                ['tagIds', oldTags, newTags],
            ];
            const changes = possibleChanges.filter(([field, oldValue, newValue]) => oldValue !== newValue);
            if (changes.length > 0) {
                await tx.productHistory.createMany({
                    data: changes.map(([field, oldValue, newValue]) => ({
                        productId: id,
                        field,
                        oldValue,
                        newValue,
                    })),
                });
            }
            return updatedProduct;
        });
        await this.cacheManager.del(`products:${id}`);
        await this.cacheManager.del('products:list:all:all');
        return result;
    }
    async remove(id) {
        await this.findOne(id);
        const salesCount = await this.prisma.sale.count({
            where: { productId: id },
        });
        if (salesCount > 0) {
            throw new ConflictException('No se puede eliminar un producto que tiene ventas registradas');
        }
        const result = await this.prisma.product.delete({ where: { id } });
        await this.cacheManager.del(`products:${id}`);
        await this.cacheManager.del('products:list:all:all');
        return result;
    }
    async findLowStock() {
        const cacheKey = 'products:low-stock';
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const products = await this.prisma.product.findMany({
            where: { stock: { lte: 5 } },
            include: { category: true },
            orderBy: { name: 'asc' },
        });
        await this.cacheManager.set(cacheKey, products, 30000);
        return products;
    }
};
ProductsService = __decorate([
    Injectable(),
    __param(1, Inject('CACHE_MANAGER')),
    __metadata("design:paramtypes", [PrismaService, Object])
], ProductsService);
export { ProductsService };
//# sourceMappingURL=products.service.js.map