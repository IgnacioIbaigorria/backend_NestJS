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
let TagsService = class TagsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.tag.create({ data: dto });
    }
    findAll() {
        return this.prisma.tag.findMany({
            include: { _count: { select: { products: true } } },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const tag = await this.prisma.tag.findUnique({
            where: { id },
            include: { products: true },
        });
        if (!tag)
            throw new NotFoundException(`Etiqueta ${id} no encontrada`);
        return tag;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.tag.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.tag.delete({ where: { id } });
    }
};
TagsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TagsService);
export { TagsService };
//# sourceMappingURL=tags.service.js.map