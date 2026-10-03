import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProductsModule } from './products/products.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { TagsModule } from './tags/tags.module.js';
import { SalesModule } from './sales/sales.module.js';
import { CajaModule } from './caja/caja.module.js';
import { ReposicionModule } from './reposicion/reposicion.module.js';
import { HistoryModule } from './history/history.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ProductsModule,
    CategoriesModule,
    TagsModule,
    SalesModule,
    CajaModule,
    ReposicionModule,
    HistoryModule,
  ],
})
export class AppModule {}
