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
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service.js';
let HealthController = class HealthController {
    prisma;
    cacheManager;
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
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
    async checkDatabase() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return {
                status: 'ok',
                message: 'Conexión a base de datos exitosa',
            };
        }
        catch (error) {
            return {
                status: 'error',
                message: 'Error de conexión a base de datos',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
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
        }
        catch (error) {
            return {
                status: 'error',
                message: 'Error en cache',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
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
    async livenessCheck() {
        return {
            status: 'alive',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Health check general del servicio' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "healthCheck", null);
__decorate([
    Get('database'),
    ApiOperation({ summary: 'Verificar conexión a base de datos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkDatabase", null);
__decorate([
    Get('cache'),
    ApiOperation({ summary: 'Verificar estado del cache' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkCache", null);
__decorate([
    Get('ready'),
    ApiOperation({ summary: 'Verificar si el servicio está listo para recibir tráfico' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "readinessCheck", null);
__decorate([
    Get('live'),
    ApiOperation({ summary: 'Verificar si el servicio está vivo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "livenessCheck", null);
HealthController = __decorate([
    ApiTags('health'),
    Controller('health'),
    __param(1, Inject('CACHE_MANAGER')),
    __metadata("design:paramtypes", [PrismaService, Object])
], HealthController);
export { HealthController };
//# sourceMappingURL=health.controller.js.map