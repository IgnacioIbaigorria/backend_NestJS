import { PrismaService } from '../prisma/prisma.service.js';
export declare class CajaService {
    private prisma;
    constructor(prisma: PrismaService);
    getCaja(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getSummary(from?: string, to?: string): Promise<{
        totalSales: number;
        totalProfit: number;
        totalExpenses: number;
        netBalance: number;
        sales: {
            id: string;
            productName: string;
            quantity: number;
            unitPrice: number;
            total: number;
            costPrice: number;
            profit: number;
            payments: {
                amount: number;
                paymentMethod: string;
            }[];
            createdAt: Date;
        }[];
        expenses: {
            id: string;
            description: string;
            amount: number;
            createdAt: Date;
        }[];
    }>;
    addExpense(description: string, amount: number): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    removeExpense(id: string): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getExpenses(from?: string, to?: string): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
    }[]>;
}
