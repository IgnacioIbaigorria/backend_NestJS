var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let SalesService = class SalesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });
        if (!product) {
            throw new NotFoundException(`Producto ${dto.productId} no encontrado`);
        }
        if (product.stock < dto.quantity) {
            throw new BadRequestException(`Stock insuficiente. Disponible: ${product.stock}`);
        }
        const total = product.price.mul(dto.quantity);
        if (dto.payments && dto.payments.length > 0) {
            const totalPayments = dto.payments.reduce((sum, p) => sum + p.amount, 0);
            if (totalPayments !== total.toNumber()) {
                throw new BadRequestException(`La suma de los pagos (${totalPayments}) no coincide con el total de la venta (${total.toNumber()})`);
            }
        }
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
    findAll(filters) {
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
    async findOne(id) {
        const sale = await this.prisma.sale.findUnique({
            where: { id },
            include: { product: true, payments: true },
        });
        if (!sale)
            throw new NotFoundException(`Venta ${id} no encontrada`);
        return sale;
    }
    async getSummary(from, to) {
        const sales = await this.prisma.sale.findMany({
            where: {
                createdAt: {
                    gte: from ? new Date(from) : undefined,
                    lte: to ? new Date(to) : undefined,
                },
            },
            include: { payments: true },
        });
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.total.toNumber(), 0);
        const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);
        return {
            totalSales: sales.length,
            totalRevenue,
            totalItems,
            sales,
        };
    }
};
SalesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], SalesService);
export { SalesService };
//# sourceMappingURL=sales.service.js.map