import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateProductDto) {
    const existing = await this.prisma.product.findUnique({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException(`Ya existe un producto con el nombre "${dto.name}"`);
    }

    return this.prisma.product.create({
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
  }

  findAll(filters?: { categoryId?: string; search?: string }) {
    return this.prisma.product.findMany({
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
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, tags: true },
    });
    if (!product) throw new NotFoundException(`Producto ${id} no encontrado`);
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);

    const { categoryId, tagIds, ...rest } = dto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...rest,
        category: categoryId !== undefined
          ? categoryId === null
            ? { disconnect: true }
            : { connect: { id: categoryId } }
          : undefined,
        tags: tagIds
          ? { set: tagIds.map((tagId) => ({ id: tagId })) }
          : undefined,
      },
      include: { category: true, tags: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }

  findLowStock() {
    return this.prisma.product.findMany({
      where: { stock: { lte: 5 } },
      include: { category: true },
      orderBy: { name: 'asc' },
    });
  }
}
