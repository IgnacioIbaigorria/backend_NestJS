import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

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

    return sale;
  }

  findAll(filters?: { productId?: string; from?: string; to?: string }) {
    return this.prisma.sale.findMany({
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
  }

  async findOne(id: string) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: { product: true, payments: true },
    });
    if (!sale) throw new NotFoundException(`Venta ${id} no encontrada`);
    return sale;
  }

  // Resumen de ventas por día
  async getSummary(from?: string, to?: string) {
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

    return {
      totalSales: sales.length,
      totalRevenue,
      totalItems,
      sales,
    };
  }
}
