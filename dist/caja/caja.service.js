var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let CajaService = class CajaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCaja() {
        let caja = await this.prisma.caja.findFirst();
        if (!caja) {
            caja = await this.prisma.caja.create({ data: {} });
        }
        return caja;
    }
    async getSummary(from, to) {
        const dateFilter = {
            gte: from ? new Date(from) : undefined,
            lte: to ? new Date(to) : undefined,
        };
        const sales = await this.prisma.sale.findMany({
            where: { createdAt: dateFilter },
            include: {
                product: { select: { name: true, costPrice: true } },
                payments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
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
        const expenses = await this.prisma.expense.findMany({
            where: { createdAt: dateFilter },
            orderBy: { createdAt: 'desc' },
        });
        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount.toNumber(), 0);
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
    async addExpense(description, amount) {
        await this.getCaja();
        return this.prisma.expense.create({
            data: { description, amount },
        });
    }
    async removeExpense(id) {
        const expense = await this.prisma.expense.findUnique({ where: { id } });
        if (!expense)
            throw new NotFoundException(`Gasto ${id} no encontrado`);
        return this.prisma.expense.delete({ where: { id } });
    }
    async getExpenses(from, to) {
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
};
CajaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CajaService);
export { CajaService };
//# sourceMappingURL=caja.service.js.map