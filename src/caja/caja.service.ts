import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CajaService {
  constructor(
    private prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  // Obtiene la caja singleton (la crea si no existe)
  async getCaja() {
    const cacheKey = 'caja:current';
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    let caja = await this.prisma.caja.findFirst();
    if (!caja) {
      caja = await this.prisma.caja.create({ data: {} });
    }

    await this.cacheManager.set(cacheKey, caja, 300000); // 5 minutos
    return caja;
  }

  // Obtiene el resumen completo de caja
  async getSummary(from?: string, to?: string) {
    const cacheKey = `caja:summary:${from ?? 'all'}:${to ?? 'all'}`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const dateFilter = {
      gte: from ? new Date(from) : undefined,
      lte: to ? new Date(to) : undefined,
    };

    // Ventas con información del producto y pagos para calcular ganancia
    const sales = await this.prisma.sale.findMany({
      where: { createdAt: dateFilter },
      include: {
        product: { select: { name: true, costPrice: true } },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calcular totales
    let totalSales = 0;
    let totalProfit = 0;

    const salesWithProfit = sales.map((sale) => {
      const saleTotal = sale.total.toNumber();
      const productName = sale.product?.name ?? 'Producto eliminado';
      const costPrice = sale.product?.costPrice.toNumber() ?? 0;
      const costTotal = costPrice * sale.quantity;
      const profit = saleTotal - costTotal;

      totalSales += saleTotal;
      totalProfit += profit;

      return {
        id: sale.id,
        productName,
        quantity: sale.quantity,
        unitPrice: sale.unitPrice.toNumber(),
        total: saleTotal,
        costPrice,
        profit,
        productMissing: sale.product === null,
        payments: sale.payments.map((p) => ({
          amount: p.amount.toNumber(),
          paymentMethod: p.paymentMethod,
        })),
        createdAt: sale.createdAt,
      };
    });

    // Gastos
    const expenses = await this.prisma.expense.findMany({
      where: { createdAt: dateFilter },
      orderBy: { createdAt: 'desc' },
    });

    const totalExpenses = expenses.reduce(
      (sum, exp) => sum + exp.amount.toNumber(),
      0,
    );

    const result = {
      totalSales,
      totalProfit,
      totalExpenses,
      netBalance: totalSales - totalExpenses,
      sales: salesWithProfit,
      expenses: expenses.map((exp) => ({
        id: exp.id,
        description: exp.description,
        amount: exp.amount.toNumber(),
        createdAt: exp.createdAt,
      })),
    };

    await this.cacheManager.set(cacheKey, result, 60000); // 60 segundos
    return result;
  }

  // Agregar un gasto
  async addExpense(description: string, amount: number) {
    // Asegurar que la caja existe
    await this.getCaja();

    const result = await this.prisma.expense.create({
      data: { description, amount },
    });

    // Invalidar cache de caja
    await this.cacheManager.del('caja:summary:all:all');
    await this.cacheManager.del('caja:expenses:all:all');

    return result;
  }

  // Eliminar un gasto
  async removeExpense(id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException(`Gasto ${id} no encontrado`);
    
    const result = await this.prisma.expense.delete({ where: { id } });

    // Invalidar cache de caja
    await this.cacheManager.del('caja:summary:all:all');
    await this.cacheManager.del('caja:expenses:all:all');

    return result;
  }

  // Listar gastos
  async getExpenses(from?: string, to?: string) {
    const cacheKey = `caja:expenses:${from ?? 'all'}:${to ?? 'all'}`;
    
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    const expenses = await this.prisma.expense.findMany({
      where: {
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    await this.cacheManager.set(cacheKey, expenses, 60000); // 60 segundos
    return expenses;
  }
}
