import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class CajaService {
    private prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    getCaja(): Promise<{}>;
    getSummary(from?: string, to?: string): Promise<{}>;
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
    getExpenses(from?: string, to?: string): Promise<{}>;
}
