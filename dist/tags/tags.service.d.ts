import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTagDto } from './dto/create-tag.dto.js';
import { UpdateTagDto } from './dto/update-tag.dto.js';
export declare class TagsService {
    private prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    create(dto: CreateTagDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{}>;
    findOne(id: string): Promise<{}>;
    update(id: string, dto: UpdateTagDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
}
