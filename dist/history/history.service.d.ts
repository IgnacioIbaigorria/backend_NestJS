import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class HistoryService {
    private prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    logChange(productId: string, field: string, oldValue: string | null, newValue: string | null, changedBy?: string): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        field: string;
        oldValue: string | null;
        newValue: string | null;
        changedBy: string | null;
    }>;
    findAll(filters?: {
        productId?: string;
        field?: string;
    }): Promise<{}>;
    findOne(id: string): Promise<{}>;
}
