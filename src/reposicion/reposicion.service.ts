import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReposicionDto } from './dto/create-reposicion.dto.js';

@Injectable()
export class ReposicionService {
  constructor(
    private prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(dto: CreateReposicionDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Producto ${dto.productId} no encontrado`);
    }

    // Transacción: crea la reposición y suma al stock
    const [reposicion] = await this.prisma.$transaction([
      this.prisma.reposicion.create({ data: dto }),
      this.prisma.product.update({
        where: { id: dto.productId },
        data: { stock: { increment: dto.quantity } },
      }),
    ]);

    // Invalidar cache de productos y reposiciones
    await this.cacheManager.del(`products:${dto.productId}`);
    await this.cacheManager.del('products:list:all:all');
    await this.cacheManager.del('products:low-stock');
    await this.cacheManager.del('reposicion:list:all');

    return reposicion;
  }

  async findAll(filters?: { productId?: string }) {
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

    await this.cacheManager.set(cacheKey, reposiciones, 60000); // 60 segundos
    return reposiciones;
  }

  async findOne(id: string) {
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

    await this.cacheManager.set(cacheKey, reposicion, 60000); // 60 segundos
    return reposicion;
  }
}
