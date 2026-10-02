import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación automática de DTOs en todos los endpoints
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS para que el frontend pueda conectarse
  app.enableCors();

  // ─── Swagger ─────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('API de Gestión de Stock')
    .setDescription('Backend NestJS con PostgreSQL (Supabase) y Prisma ORM')
    .setVersion('1.0')
    .addTag('products')
    .addTag('categories')
    .addTag('tags')
    .addTag('sales')
    .addTag('caja')
    .addTag('reposicion')
    .addTag('history')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // ─────────────────────────────────────────────────────────────

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API corriendo en http://localhost:${port}`);
  console.log(`Documentación Swagger en http://localhost:${port}/api/docs`);
}
await bootstrap();
