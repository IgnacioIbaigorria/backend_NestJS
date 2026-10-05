import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './common/filters/http-exception.filter.js';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new AllExceptionsFilter());
    app.enableCors();
    const config = new DocumentBuilder()
        .setTitle('API de Gestión de Stock')
        .setDescription('API NestJS para la gestión de una tienda ecofriendly, protegida con Amazon Cognito.')
        .setVersion('1.0')
        .addBearerAuth()
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
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`API corriendo en http://localhost:${port}`);
    console.log(`Documentación Swagger en http://localhost:${port}/api/docs`);
}
await bootstrap();
//# sourceMappingURL=main.js.map