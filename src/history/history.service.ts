import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class HistoryService {
  constructor(
    private prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  // Registra un cambio en el historial
  async logChange(
    productId: string,
    field: string,
    oldValue: string | null,
    newValue: string | null,
    changedBy?: string,
  ) {
    const result = await this.prisma.productHistory.create({
      data: { productId, field, oldValue, newValue, changedBy },
    });

    // Invalidar cache de historial
    await this.cacheManager.del('history:list:all:all');
    await this.cacheManager.del(`history:list:${productId}:all`);

    return result;
  }

  async findAll(filters?: { productId?: string; field?: string }) {
    const cacheKey = `history:list:${filters?.productId ?? 'all'}:${filters?.field ?? 'all'}`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const history = await this.prisma.productHistory.findMany({
      where: {
        productId: filters?.productId,
        field: filters?.field,
      },
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    await this.cacheManager.set(cacheKey, history, 60000); // 60 segundos
    return history;
  }

  async findOne(id: string) {
    const cacheKey = `history:${id}`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const entry = await this.prisma.productHistory.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!entry) throw new NotFoundException(`Historial ${id} no encontrado`);

    await this.cacheManager.set(cacheKey, entry, 60000); // 60 segundos
    return entry;
  }
}
