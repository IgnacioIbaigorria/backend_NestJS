import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
export declare class ProductsService {
    private prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    create(dto: CreateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        tags: {
            id: string;
            name: string;
            createdAt: Date;
        }[];
    } & {
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
    }>;
    findAll(filters?: {
        categoryId?: string;
        search?: string;
    }): Promise<{}>;
    findOne(id: string): Promise<{}>;
    update(id: string, dto: UpdateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        tags: {
            id: string;
            name: string;
            createdAt: Date;
        }[];
    } & {
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    findLowStock(): Promise<{}>;
}
