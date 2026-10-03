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
    const { categoryId, tagIds, ...rest } = dto;

    return this.prisma.$transaction(async (tx) => {
      const currentProduct = await tx.product.findUnique({
        where: { id },
        include: { tags: { select: { id: true } } },
      });
      if (!currentProduct) {
        throw new NotFoundException(`Producto ${id} no encontrado`);
      }

      const updatedProduct = await tx.product.update({
        where: { id },
        data: {
          ...rest,
          category: categoryId !== undefined
            ? categoryId === null
              ? { disconnect: true }
              : { connect: { id: categoryId } }
            : undefined,
          tags: tagIds !== undefined
            ? { set: tagIds.map((tagId) => ({ id: tagId })) }
            : undefined,
        },
        include: { category: true, tags: true },
      });

      const oldTags = currentProduct.tags
        .map((tag) => tag.id)
        .sort()
        .join(',');
      const newTags = updatedProduct.tags
        .map((tag) => tag.id)
        .sort()
        .join(',');
      type ProductChange = [
        field: string,
        oldValue: string | null,
        newValue: string | null,
      ];
      const possibleChanges: ProductChange[] = [
        ['name', currentProduct.name, updatedProduct.name],
        ['description', currentProduct.description, updatedProduct.description],
        ['price', currentProduct.price.toString(), updatedProduct.price.toString()],
        [
          'costPrice',
          currentProduct.costPrice.toString(),
          updatedProduct.costPrice.toString(),
        ],
        ['stock', String(currentProduct.stock), String(updatedProduct.stock)],
        [
          'minStock',
          String(currentProduct.minStock),
          String(updatedProduct.minStock),
        ],
        ['categoryId', currentProduct.categoryId, updatedProduct.categoryId],
        ['tagIds', oldTags, newTags],
      ];
      const changes = possibleChanges.filter(
        ([field, oldValue, newValue]) => oldValue !== newValue,
      );

      if (changes.length > 0) {
        await tx.productHistory.createMany({
          data: changes.map(([field, oldValue, newValue]) => ({
            productId: id,
            field,
            oldValue,
            newValue,
          })),
        });
      }

      return updatedProduct;
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    const salesCount = await this.prisma.sale.count({
      where: { productId: id },
    });
    if (salesCount > 0) {
      throw new ConflictException(
        'No se puede eliminar un producto que tiene ventas registradas',
      );
    }

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
