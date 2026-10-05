import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class HealthController {
    private readonly prisma;
    private cacheManager;
    constructor(prisma: PrismaService, cacheManager: Cache);
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
        checks: {
            database: {
                status: string;
                message: string;
                error?: undefined;
            } | {
                status: string;
                message: string;
                error: string;
            };
            cache: {
                status: string;
                message: string;
                error?: undefined;
            } | {
                status: string;
                message: string;
                error: string;
            };
        };
    }>;
    checkDatabase(): Promise<{
        status: string;
        message: string;
        error?: undefined;
    } | {
        status: string;
        message: string;
        error: string;
    }>;
    checkCache(): Promise<{
        status: string;
        message: string;
        error?: undefined;
    } | {
        status: string;
        message: string;
        error: string;
    }>;
    readinessCheck(): Promise<{
        status: string;
        reason: string;
        timestamp: string;
    } | {
        status: string;
        timestamp: string;
        reason?: undefined;
    }>;
    livenessCheck(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
    }>;
}
