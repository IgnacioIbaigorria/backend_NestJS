import { HistoryService } from './history.service.js';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    findAll(productId?: string, field?: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        product: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        field: string;
        oldValue: string | null;
        newValue: string | null;
        changedBy: string | null;
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
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        field: string;
        oldValue: string | null;
        newValue: string | null;
        changedBy: string | null;
    }>;
}
