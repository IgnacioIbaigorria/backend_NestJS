import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
export declare class SalesService {
    private prisma;
    constructor(prisma: PrismaService);
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
    }): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        product: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            costPrice: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            minStock: number;
            categoryId: string | null;
        };
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
    })[]>;
    findOne(id: string): Promise<{
        product: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            costPrice: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            minStock: number;
            categoryId: string | null;
        };
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
    getSummary(from?: string, to?: string): Promise<{
        totalSales: number;
        totalRevenue: number;
        totalItems: number;
        sales: ({
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
        })[];
    }>;
}
