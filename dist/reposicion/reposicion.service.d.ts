import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReposicionDto } from './dto/create-reposicion.dto.js';
export declare class ReposicionService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateReposicionDto): Promise<{
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        supplier: string | null;
        cost: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    findAll(filters?: {
        productId?: string;
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
    } & {
        id: string;
        createdAt: Date;
        productId: string;
        quantity: number;
        supplier: string | null;
        cost: import("@prisma/client-runtime-utils").Decimal | null;
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
        quantity: number;
        supplier: string | null;
        cost: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
}
