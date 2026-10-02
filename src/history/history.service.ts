import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  // Registra un cambio en el historial
  async logChange(
    productId: string,
    field: string,
    oldValue: string | null,
    newValue: string | null,
    changedBy?: string,
  ) {
    return this.prisma.productHistory.create({
      data: { productId, field, oldValue, newValue, changedBy },
    });
  }

  findAll(filters?: { productId?: string; field?: string }) {
    return this.prisma.productHistory.findMany({
      where: {
        productId: filters?.productId,
        field: filters?.field,
      },
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const entry = await this.prisma.productHistory.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!entry) throw new NotFoundException(`Historial ${id} no encontrado`);
    return entry;
  }
}
