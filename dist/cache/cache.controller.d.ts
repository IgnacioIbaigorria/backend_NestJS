import type { Cache } from 'cache-manager';
export declare class CacheController {
    private cacheManager;
    constructor(cacheManager: Cache);
    healthCheck(): {
        status: string;
        timestamp: string;
        uptime: number;
    };
    clearCache(): Promise<{
        message: string;
        timestamp: string;
    }>;
    clearCacheByPattern(pattern: string): Promise<{
        message: string;
        timestamp: string;
    }>;
    private clearAllCache;
}
