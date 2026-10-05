var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/auth.decorators.js';
let CacheController = class CacheController {
    cacheManager;
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    healthCheck() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    }
    async clearCache() {
        await this.clearAllCache();
        return {
            message: 'Cache limpiado exitosamente',
            timestamp: new Date().toISOString(),
        };
    }
    async clearCacheByPattern(pattern) {
        await this.clearAllCache();
        return {
            message: `Cache limpiado para patrón: ${pattern}`,
            timestamp: new Date().toISOString(),
        };
    }
    async clearAllCache() {
        const stores = this.cacheManager.stores;
        if (stores && Array.isArray(stores)) {
            for (const store of stores) {
                if (store && typeof store.keys === 'function') {
                    const keys = await store.keys();
                    await Promise.all(keys.map((key) => this.cacheManager.del(key)));
                }
            }
        }
    }
};
__decorate([
    Get('health'),
    ApiOperation({ summary: 'Health check del servicio' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CacheController.prototype, "healthCheck", null);
__decorate([
    Delete('clear'),
    Roles('ADMIN'),
    ApiOperation({ summary: 'Limpiar todo el cache (solo ADMIN)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "clearCache", null);
__decorate([
    Delete('clear/:pattern'),
    Roles('ADMIN'),
    ApiOperation({ summary: 'Limpiar cache por patrón (solo ADMIN)' }),
    __param(0, Param('pattern')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CacheController.prototype, "clearCacheByPattern", null);
CacheController = __decorate([
    ApiTags('cache'),
    ApiBearerAuth(),
    Controller('cache'),
    __param(0, Inject('CACHE_MANAGER')),
    __metadata("design:paramtypes", [Object])
], CacheController);
export { CacheController };
//# sourceMappingURL=cache.controller.js.map