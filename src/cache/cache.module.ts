import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller.js';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60000, // 60 segundos por defecto
      max: 200, // máximo 200 items en cache
    }),
  ],
  controllers: [CacheController],
})
export class AppCacheModule { }
