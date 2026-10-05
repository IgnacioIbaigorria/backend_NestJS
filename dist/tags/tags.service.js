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
let TagsService = class TagsService {
    prisma;
    cacheManager;
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async create(dto) {
        const result = await this.prisma.tag.create({ data: dto });
        await this.cacheManager.del('tags:list');
        return result;
    }
    async findAll() {
        const cacheKey = 'tags:list';
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const tags = await this.prisma.tag.findMany({
            include: { _count: { select: { products: true } } },
            orderBy: { name: 'asc' },
        });
        await this.cacheManager.set(cacheKey, tags, 300000);
        return tags;
    }
    async findOne(id) {
        const cacheKey = `tags:${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
        const tag = await this.prisma.tag.findUnique({
            where: { id },
            include: { products: true },
        });
        if (!tag)
            throw new NotFoundException(`Etiqueta ${id} no encontrada`);
        await this.cacheManager.set(cacheKey, tag, 300000);
        return tag;
    }
    async update(id, dto) {
        await this.findOne(id);
        const result = await this.prisma.tag.update({ where: { id }, data: dto });
        await this.cacheManager.del(`tags:${id}`);
        await this.cacheManager.del('tags:list');
        return result;
    }
    async remove(id) {
        await this.findOne(id);
        const result = await this.prisma.tag.delete({ where: { id } });
        await this.cacheManager.del(`tags:${id}`);
        await this.cacheManager.del('tags:list');
        return result;
    }
};
TagsService = __decorate([
    Injectable(),
    __param(1, Inject('CACHE_MANAGER')),
    __metadata("design:paramtypes", [PrismaService, Object])
], TagsService);
export { TagsService };
//# sourceMappingURL=tags.service.js.map