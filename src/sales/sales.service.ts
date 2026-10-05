import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';

@Injectable()
export class SalesService {
  constructor(
    private prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  async create(dto: CreateSaleDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) {
      throw new NotFoundException(`Producto ${dto.productId} no encontrado`);
    }
    if (product.stock < dto.quantity) {
      throw new BadRequestException(
        `Stock insuficiente. Disponible: ${product.stock}`,
      );
    }

    const total = product.price.mul(dto.quantity);

    // Validar que la suma de pagos coincida con el total
    if (dto.payments && dto.payments.length > 0) {
      const totalPayments = dto.payments.reduce(
        (sum, p) => sum + p.amount,
        0,
      );
      if (totalPayments !== total.toNumber()) {
        throw new BadRequestException(
          `La suma de los pagos (${totalPayments}) no coincide con el total de la venta (${total.toNumber()})`,
        );
      }
    }

    // Transacción: crea la venta, los pagos y descuenta el stock
    const [sale] = await this.prisma.$transaction([
      this.prisma.sale.create({
        data: {
          productId: dto.productId,
          quantity: dto.quantity,
          unitPrice: product.price,
          total,
          payments: dto.payments
            ? {
                create: dto.payments.map((p) => ({
                  amount: p.amount,
                  paymentMethod: p.paymentMethod,
                })),
              }
            : undefined,
        },
        include: { payments: true },
      }),
      this.prisma.product.update({
        where: { id: dto.productId },
        data: { stock: { decrement: dto.quantity } },
      }),
    ]);

    // Invalidar cache de ventas y productos
    await this.cacheManager.del('sales:list:all:all:all');
    await this.cacheManager.del(`products:${dto.productId}`);
    await this.cacheManager.del('products:list:all:all');
    await this.cacheManager.del('products:low-stock');

    return sale;
  }

  async findAll(filters?: { productId?: string; from?: string; to?: string }) {
    const cacheKey = `sales:list:${filters?.productId ?? 'all'}:${filters?.from ?? 'all'}:${filters?.to ?? 'all'}`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const sales = await this.prisma.sale.findMany({
      where: {
        productId: filters?.productId,
        createdAt: {
          gte: filters?.from ? new Date(filters.from) : undefined,
          lte: filters?.to ? new Date(filters.to) : undefined,
        },
      },
      include: { product: true, payments: true },
      orderBy: { createdAt: 'desc' },
    });

    await this.cacheManager.set(cacheKey, sales, 60000); // 60 segundos
    return sales;
  }

  async findOne(id: string) {
    const cacheKey = `sales:${id}`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: { product: true, payments: true },
    });
    if (!sale) throw new NotFoundException(`Venta ${id} no encontrada`);

    await this.cacheManager.set(cacheKey, sale, 60000); // 60 segundos
    return sale;
  }

  // Resumen de ventas por día
  async getSummary(from?: string, to?: string) {
    const cacheKey = `sales:summary:${from ?? 'all'}:${to ?? 'all'}`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const sales = await this.prisma.sale.findMany({
      where: {
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      include: { payments: true },
    });

    const totalRevenue = sales.reduce(
      (sum, sale) => sum + sale.total.toNumber(),
      0,
    );
    const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);

    const result = {
      totalSales: sales.length,
      totalRevenue,
      totalItems,
      sales,
    };

    await this.cacheManager.set(cacheKey, result, 60000); // 60 segundos
    return result;
  }
}
