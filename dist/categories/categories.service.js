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
let CategoriesService = class CategoriesService {
    prisma;
    cacheManager;
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async create(dto) {
        const result = await this.prisma.category.create({ data: dto });
        await this.cacheManager.del('categories:list');
        return result;
    }
    async findAll() {
        const cacheKey = 'categories:list';
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const categories = await this.prisma.category.findMany({
            include: { _count: { select: { products: true } } },
            orderBy: { name: 'asc' },
        });
        await this.cacheManager.set(cacheKey, categories, 300000);
        return categories;
    }
    async findOne(id) {
        const cacheKey = `categories:${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: { products: true },
        });
        if (!category)
            throw new NotFoundException(`Categoría ${id} no encontrada`);
        await this.cacheManager.set(cacheKey, category, 300000);
        return category;
    }
    async update(id, dto) {
        await this.findOne(id);
        const result = await this.prisma.category.update({ where: { id }, data: dto });
        await this.cacheManager.del(`categories:${id}`);
        await this.cacheManager.del('categories:list');
        return result;
    }
    async remove(id) {
        await this.findOne(id);
        const result = await this.prisma.category.delete({ where: { id } });
        await this.cacheManager.del(`categories:${id}`);
        await this.cacheManager.del('categories:list');
        return result;
    }
};
CategoriesService = __decorate([
    Injectable(),
    __param(1, Inject('CACHE_MANAGER')),
    __metadata("design:paramtypes", [PrismaService, Object])
], CategoriesService);
export { CategoriesService };
//# sourceMappingURL=categories.service.js.map