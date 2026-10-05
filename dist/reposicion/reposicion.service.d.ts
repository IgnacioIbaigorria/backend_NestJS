import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReposicionDto } from './dto/create-reposicion.dto.js';
export declare class ReposicionService {
    private prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
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
    }): Promise<{}>;
    findOne(id: string): Promise<{}>;
}
