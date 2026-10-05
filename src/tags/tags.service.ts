import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTagDto } from './dto/create-tag.dto.js';
import { UpdateTagDto } from './dto/update-tag.dto.js';

@Injectable()
export class TagsService {
  constructor(
    private prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(dto: CreateTagDto) {
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

    await this.cacheManager.set(cacheKey, tags, 300000); // 5 minutos
    return tags;
  }

  async findOne(id: string) {
    const cacheKey = `tags:${id}`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!tag) throw new NotFoundException(`Etiqueta ${id} no encontrada`);

    await this.cacheManager.set(cacheKey, tag, 300000); // 5 minutos
    return tag;
  }

  async update(id: string, dto: UpdateTagDto) {
    await this.findOne(id);
    const result = await this.prisma.tag.update({ where: { id }, data: dto });
    
    await this.cacheManager.del(`tags:${id}`);
    await this.cacheManager.del('tags:list');
    
    return result;
  }

  async remove(id: string) {
    await this.findOne(id);
    const result = await this.prisma.tag.delete({ where: { id } });
    
    await this.cacheManager.del(`tags:${id}`);
    await this.cacheManager.del('tags:list');
    
    return result;
  }
}
