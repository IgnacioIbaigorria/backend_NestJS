import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
export declare class SalesService {
    private prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    create(dto: CreateSaleDto): Promise<{
        payments: {
            id: string;
            createdAt: Date;
            saleId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            paymentMethod: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        unitPrice: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
    }>;
    findAll(filters?: {
        productId?: string;
        from?: string;
        to?: string;
    }): Promise<{}>;
    findOne(id: string): Promise<{}>;
    getSummary(from?: string, to?: string): Promise<{}>;
}
