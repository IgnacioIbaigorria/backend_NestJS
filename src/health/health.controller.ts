import { Controller, Get, Inject } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check general del servicio' })
  async healthCheck() {
    const checks = await Promise.all([
      this.checkDatabase(),
      this.checkCache(),
    ]);

    const allHealthy = checks.every((check) => check.status === 'ok');

    return {
      status: allHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks: {
        database: checks[0],
        cache: checks[1],
      },
    };
  }

  @Get('database')
  @ApiOperation({ summary: 'Verificar conexión a base de datos' })
  async checkDatabase() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        message: 'Conexión a base de datos exitosa',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error de conexión a base de datos',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get('cache')
  @ApiOperation({ summary: 'Verificar estado del cache' })
  async checkCache() {
    try {
      const testKey = 'health-check-test';
      await this.cacheManager.set(testKey, 'ok', 10000);
      const value = await this.cacheManager.get(testKey);
      await this.cacheManager.del(testKey);

      if (value === 'ok') {
        return {
          status: 'ok',
          message: 'Cache funcionando correctamente',
        };
      }

      return {
        status: 'error',
        message: 'Cache no respondió correctamente',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Error en cache',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get('ready')
  @ApiOperation({ summary: 'Verificar si el servicio está listo para recibir tráfico' })
  async readinessCheck() {
    const dbCheck = await this.checkDatabase();

    if (dbCheck.status !== 'ok') {
      return {
        status: 'not ready',
        reason: 'Base de datos no disponible',
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('live')
  @ApiOperation({ summary: 'Verificar si el servicio está vivo' })
  async livenessCheck() {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
