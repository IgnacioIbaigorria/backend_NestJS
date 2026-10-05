var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let CajaService = class CajaService {
    prisma;
    cacheManager;
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
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
        await this.cacheManager.set(cacheKey, caja, 300000);
        return caja;
    }
    async getSummary(from, to) {
        const cacheKey = `caja:summary:${from ?? 'all'}:${to ?? 'all'}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached) {
            return cached;
        }
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
        const expenses = await this.prisma.expense.findMany({
            where: { createdAt: dateFilter },
            orderBy: { createdAt: 'desc' },
        });
        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount.toNumber(), 0);
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
        await this.cacheManager.set(cacheKey, result, 60000);
        return result;
    }
    async addExpense(description, amount) {
        await this.getCaja();
        const result = await this.prisma.expense.create({
            data: { description, amount },
        });
        await this.cacheManager.del('caja:summary:all:all');
        await this.cacheManager.del('caja:expenses:all:all');
        return result;
    }
    async removeExpense(id) {
        const expense = await this.prisma.expense.findUnique({ where: { id } });
        if (!expense)
            throw new NotFoundException(`Gasto ${id} no encontrado`);
        const result = await this.prisma.expense.delete({ where: { id } });
        await this.cacheManager.del('caja:summary:all:all');
        await this.cacheManager.del('caja:expenses:all:all');
        return result;
    }
    async getExpenses(from, to) {
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
        await this.cacheManager.set(cacheKey, expenses, 60000);
        return expenses;
    }
};
CajaService = __decorate([
    Injectable(),
    __param(1, Inject('CACHE_MANAGER')),
    __metadata("design:paramtypes", [PrismaService, Object])
], CajaService);
export { CajaService };
//# sourceMappingURL=caja.service.js.map