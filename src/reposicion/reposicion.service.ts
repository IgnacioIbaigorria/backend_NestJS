import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReposicionDto } from './dto/create-reposicion.dto.js';

@Injectable()
export class ReposicionService {
  constructor(private prisma: PrismaService) {}

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

    return reposicion;
  }

  findAll(filters?: { productId?: string }) {
    return this.prisma.reposicion.findMany({
      where: { productId: filters?.productId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const reposicion = await this.prisma.reposicion.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!reposicion) {
      throw new NotFoundException(`Reposición ${id} no encontrada`);
    }
    return reposicion;
  }
}
