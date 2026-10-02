import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global() // disponible en toda la app sin importar
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
