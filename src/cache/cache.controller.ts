import { Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/auth.decorators.js';

@ApiTags('cache')
@ApiBearerAuth()
@Controller('cache')
export class CacheController {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check del servicio' })
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Delete('clear')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Limpiar todo el cache (solo ADMIN)' })
  async clearCache() {
    await this.clearAllCache();
    return {
      message: 'Cache limpiado exitosamente',
      timestamp: new Date().toISOString(),
    };
  }

  @Delete('clear/:pattern')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Limpiar cache por patrón (solo ADMIN)' })
  async clearCacheByPattern(@Param('pattern') pattern: string) {
    await this.clearAllCache();
    return {
      message: `Cache limpiado para patrón: ${pattern}`,
      timestamp: new Date().toISOString(),
    };
  }

  private async clearAllCache() {
    const stores = (this.cacheManager as any).stores;
    if (stores && Array.isArray(stores)) {
      for (const store of stores) {
        if (store && typeof store.keys === 'function') {
          const keys = await store.keys();
          await Promise.all(keys.map((key: string) => this.cacheManager.del(key)));
        }
      }
    }
  }
}
