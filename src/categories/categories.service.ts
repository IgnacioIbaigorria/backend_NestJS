import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(dto: CreateCategoryDto) {
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

    await this.cacheManager.set(cacheKey, categories, 300000); // 5 minutos
    return categories;
  }

  async findOne(id: string) {
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

    await this.cacheManager.set(cacheKey, category, 300000); // 5 minutos
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id);
    const result = await this.prisma.category.update({ where: { id }, data: dto });
    
    await this.cacheManager.del(`categories:${id}`);
    await this.cacheManager.del('categories:list');
    
    return result;
  }

  async remove(id: string) {
    await this.findOne(id);
    const result = await this.prisma.category.delete({ where: { id } });
    
    await this.cacheManager.del(`categories:${id}`);
    await this.cacheManager.del('categories:list');
    
    return result;
  }
}
