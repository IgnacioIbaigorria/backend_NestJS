import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CajaService {
  constructor(private prisma: PrismaService) {}

  // Obtiene la caja singleton (la crea si no existe)
  async getCaja() {
    let caja = await this.prisma.caja.findFirst();
    if (!caja) {
      caja = await this.prisma.caja.create({ data: {} });
    }
    return caja;
  }

  // Obtiene el resumen completo de caja
  async getSummary(from?: string, to?: string) {
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
      const costTotal = sale.product.costPrice.toNumber() * sale.quantity;
      const profit = saleTotal - costTotal;

      totalSales += saleTotal;
      totalProfit += profit;

      return {
        id: sale.id,
        productName: sale.product.name,
        quantity: sale.quantity,
        unitPrice: sale.unitPrice.toNumber(),
        total: saleTotal,
        costPrice: sale.product.costPrice.toNumber(),
        profit,
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

    return {
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
  }

  // Agregar un gasto
  async addExpense(description: string, amount: number) {
    // Asegurar que la caja existe
    await this.getCaja();

    return this.prisma.expense.create({
      data: { description, amount },
    });
  }

  // Eliminar un gasto
  async removeExpense(id: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException(`Gasto ${id} no encontrado`);
    return this.prisma.expense.delete({ where: { id } });
  }

  // Listar gastos
  async getExpenses(from?: string, to?: string) {
    return this.prisma.expense.findMany({
      where: {
        createdAt: {
          gte: from ? new Date(from) : undefined,
          lte: to ? new Date(to) : undefined,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
