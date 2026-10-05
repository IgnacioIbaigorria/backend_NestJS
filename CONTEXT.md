# Contexto del Repositorio - Backend NestJS

## Descripción General

API REST para gestión de stock de una tienda ecofriendly, construida con NestJS 12, Prisma ORM 7 y PostgreSQL (Supabase). Desplegado en contenedor Docker sobre instancia EC2 de AWS.

## Stack Tecnológico

| Componente | Versión | Notas |
|------------|---------|-------|
| NestJS | ^12.0.1 | Framework principal |
| Prisma ORM | ^7.10.0 | Con driver adapter (PrismaPg) |
| PostgreSQL | - | Supabase como proveedor |
| TypeScript | ^6.0.2 | Strict mode habilitado |
| Vitest | ^4.1.2 | Testing (unit + e2e) |
| Docker | - | Multi-stage build |
| AWS | - | EC2 + Cognito |

## Estructura del Proyecto

```
src/
├── auth/           # Autenticación con Cognito
├── caja/           # Gestión de caja (singleton)
├── categories/     # Categorías de productos
├── history/        # Historial de cambios
├── prisma/         # Servicio de base de datos
├── products/       # CRUD de productos
├── reposicion/     # Reposición de stock
├── sales/          # Ventas y pagos
├── tags/           # Etiquetas de productos
├── main.ts         # Punto de entrada
└── app.module.ts   # Composition root
```

## Decisiones Arquitectónicas

### 1. Estructura Modular
- **Decisión**: Cada dominio de negocio es un módulo independiente
- **Razón**: Facilita mantenibilidad, testing y escalabilidad
- **Módulos**: Products, Categories, Tags, Sales, Caja, Reposicion, History, Auth

### 2. Prisma 7 con Driver Adapter
- **Decisión**: Usar `@prisma/adapter-pg` en lugar de cliente nativo
- **Razón**: Prisma 7 requiere driver adapters para conexiones a base de datos
- **Configuración**: `PrismaService` extiende `PrismaClient` con `PrismaPg`

### 3. Autenticación con Amazon Cognito (BFF Pattern)
- **Decisión**: Backend for Frontend (BFF) para manejar autenticación con Cognito
- **Razón**: Mantener client secret seguro en el backend, no exponerlo en el frontend
- **Implementación**: 
  - `CognitoBffService`: Maneja login y refresh tokens con client_id + client_secret
  - `CognitoAuthGuard`: Verifica tokens JWT en requests autenticados
  - `CognitoService`: Verifica tokens con `aws-jwt-verify`
- **Roles**: ADMIN, MANAGER, INVENTORY_MANAGER (vía `cognito:groups`)
- **Endpoints**:
  - `POST /auth/login` - Login con username + password
  - `POST /auth/refresh` - Renovar access token con refresh token
- **Flujo**: Frontend → Backend (con secret) → Cognito → Backend → Frontend (solo JWT)

### 4. Autorización por Roles
- **Decisión**: Guard `RolesGuard` con decorador `@Roles()`
- **Razón**: Control de acceso granular por endpoint
- **Uso**: `@Roles('ADMIN', 'MANAGER')` en controladores

### 5. Transacciones de Prisma
- **Decisión**: Usar `$transaction` para operaciones críticas
- **Razón**: Consistencia de datos en operaciones multi-tabla
- **Ejemplos**: 
  - Venta: crea venta + pagos + descuenta stock
  - Reposición: crea reposición + suma stock
  - Update producto: actualiza + registra historial

### 6. Historial de Cambios
- **Decisión**: Tabla `ProductHistory` para auditar cambios
- **Razón**: Trazabilidad de modificaciones de productos
- **Implementación**: Se registra automáticamente en `update()`

### 7. Caja Singleton
- **Decisión**: Una sola instancia de caja en la base de datos
- **Razón**: Modelo de negocio de una sola tienda
- **Implementación**: `getCaja()` crea la caja si no existe

### 8. Docker Multi-Stage Build
- **Decisión**: Build en 2 etapas (builder + production)
- **Razón**: Imagen de producción más pequeña y segura
- **Etapas**: 
  - Builder: instala deps, genera cliente Prisma, compila
  - Production: solo deps de producción + artefactos

### 9. ESM con Extensiones .js
- **Decisión**: Módulos ESM con imports explícitos `.js`
- **Razón**: Requerido por `nodenext` module resolution
- **Ejemplo**: `import { Foo } from './foo.js'`

### 10. Validación con class-validator
- **Decisión**: DTOs con decoradores de validación
- **Razón**: Validación declarativa y reutilizable
- **Configuración**: `ValidationPipe` global con `whitelist: true`

### 14. Manejo Global de Errores
- **Decisión**: `AllExceptionsFilter` para capturar todos los errores
- **Razón**: Respuestas de error consistentes, logging centralizado
- **Implementación**: 
  - Captura todas las excepciones (HttpException y errores genéricos)
  - Formato de respuesta uniforme: `{ success, statusCode, message, errors, timestamp, path, method }`
  - Logging de errores no manejados con stack trace
- **Uso**: Registrado globalmente en `main.ts` con `app.useGlobalFilters()`

### 15. Health Check
- **Decisión**: Endpoints de health check para monitoreo
- **Razón**: Facilita monitoreo, auto-scaling y detección de problemas
- **Endpoints**:
  - `GET /health` - Health check general (database + cache)
  - `GET /health/database` - Verificar conexión a PostgreSQL
  - `GET /health/cache` - Verificar estado del cache
  - `GET /health/ready` - Readiness check (listo para recibir tráfico)
  - `GET /health/live` - Liveness check (servicio vivo)
- **Implementación**: `HealthController` con verificaciones asíncronas

### 11. Swagger para Documentación
- **Decisión**: Documentación automática con `@nestjs/swagger`
- **Razón**: Documentación viva y testeable
- **URL**: `/api/docs`

### 12. Migraciones en Entrypoint
- **Decisión**: Ejecutar `prisma migrate deploy` en el entrypoint
- **Razón**: Aplicar migraciones automáticamente al desplegar
- **Riesgo**: Migraciones concurrentes si múltiples contenedores inician simultáneamente

### 13. Caching con @nestjs/cache-manager
- **Decisión**: Implementar caching en memoria con `@nestjs/cache-manager`
- **Razón**: Reducir carga en PostgreSQL, mejorar tiempos de respuesta
- **Backend**: En memoria (ideal para un solo contenedor EC2)
- **TTL por defecto**: 60 segundos (300s para categorías/tags, 30s para low-stock)
- **Invalidación**: Automática en operaciones de escritura (create, update, delete)
- **Endpoints cacheados**:
  - `GET /products` - Lista de productos
  - `GET /products/:id` - Producto por ID
  - `GET /products/low-stock` - Productos con stock bajo
  - `GET /categories` - Lista de categorías
  - `GET /tags` - Lista de etiquetas
  - `GET /sales` - Lista de ventas
  - `GET /sales/summary` - Resumen de ventas
  - `GET /caja/summary` - Resumen de caja
  - `GET /reposicion` - Lista de reposiciones
  - `GET /history` - Historial de cambios
- **Endpoints de administración**:
  - `GET /cache/health` - Health check
  - `DELETE /cache/clear` - Limpiar todo el cache (solo ADMIN)
  - `DELETE /cache/clear/:pattern` - Limpiar cache por patrón (solo ADMIN)

## Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `DATABASE_URL` | Connection string PostgreSQL | Sí |
| `PORT` | Puerto de la API (default: 3000) | No |
| `COGNITO_USER_POOL_ID` | User Pool ID de Cognito | Sí |
| `COGNITO_CLIENT_ID` | Client ID de Cognito | Sí |
| `COGNITO_CLIENT_SECRET` | Client Secret de Cognito (solo backend) | Sí |
| `AWS_REGION` | Región de AWS (default: us-east-1) | No |

## Endpoints Principales

### Productos
- `POST /products` - Crear (ADMIN, MANAGER, INVENTORY_MANAGER)
- `GET /products` - Listar (filtros: categoryId, search)
- `GET /products/low-stock` - Stock bajo
- `GET /products/:id` - Obtener por ID
- `PATCH /products/:id` - Actualizar (ADMIN, MANAGER, INVENTORY_MANAGER)
- `DELETE /products/:id` - Eliminar (ADMIN, MANAGER, INVENTORY_MANAGER)

### Ventas
- `POST /sales` - Registrar venta
- `GET /sales` - Listar (filtros: productId, from, to)
- `GET /sales/summary` - Resumen de ventas
- `GET /sales/:id` - Obtener por ID

### Caja
- `POST /caja/open` - Abrir caja
- `GET /caja/open` - Ver caja abierta
- `PATCH /caja/:id/close` - Cerrar caja
- `GET /caja` - Listar cajas
- `GET /caja/:id` - Obtener por ID

### Reposición
- `POST /reposicion` - Registrar reposición
- `GET /reposicion` - Listar (filtro: productId)
- `GET /reposicion/:id` - Obtener por ID

### Historial
- `GET /history` - Listar (filtros: productId, field)
- `GET /history/:id` - Obtener por ID

## Potenciales Errores y Riesgos

### 🔴 Críticos

1. **CORS Abierto**
   - **Problema**: `app.enableCors()` sin restricciones
   - **Riesgo**: Cualquier origen puede hacer peticiones
   - **Solución**: Configurar orígenes permitidos

2. **Sin Rate Limiting**
   - **Problema**: No hay límite de requests por IP
   - **Riesgo**: Ataques DDoS, abuso de la API
   - **Solución**: Implementar `@nestjs/throttler`

3. **Sin Health Check**
   - **Problema**: No hay endpoint de health check
   - **Riesgo**: Dificulta monitoreo y auto-scaling
   - **Solución**: Agregar `/health` con `@nestjs/terminus`

4. **Sin Manejo de Errores Global**
   - **Problema**: Errores no capturados pueden exponer información
   - **Riesgo**: Fugas de información, respuestas inconsistentes
   - **Solución**: Implementar `ExceptionFilter` global

5. **Migraciones Concurrentes**
   - **Problema**: Múltiples contenedores pueden ejecutar migraciones simultáneamente
   - **Riesgo**: Corrupción de base de datos, fallos de migración
   - **Solución**: Usar lock de base de datos o init container

### 🟡 Moderados

6. **Sin Logging Estructurado**
   - **Problema**: Solo `console.log` básico
   - **Riesgo**: Dificultad para debugging y monitoreo
   - **Solución**: Implementar `nestjs-pino` o similar

7. **Sin Compresión de Respuestas**
   - **Problema**: Respuestas grandes sin comprimir
   - **Riesgo**: Mayor latencia, mayor costo de transferencia
   - **Solución**: Agregar `compression` middleware

8. **Sin Helmet**
   - **Problema**: Headers de seguridad no configurados
   - **Riesgo**: Vulnerabilidades XSS, clickjacking
   - **Solución**: Agregar `helmet` middleware

9. **Sin Validación de Variables de Entorno**
   - **Problema**: Variables requeridas no se validan al inicio
   - **Riesgo**: Errores en runtime por falta de configuración
   - **Solución**: Validar en `main.ts` antes de iniciar

10. **Sin Graceful Shutdown**
    - **Problema**: No se manejan señales SIGTERM/SIGINT
    - **Riesgo**: Pérdida de datos en deployments
    - **Solución**: Implementar `app.enableShutdownHooks()`

11. **Sin Timeouts de Conexión**
    - **Problema**: Conexiones a base de datos sin timeout
    - **Riesgo**: Conexiones colgadas, agotamiento de pool
    - **Solución**: Configurar timeouts en Prisma

12. **Sin Paginación**
    - **Problema**: Listados sin límite de resultados
    - **Riesgo**: Respuestas muy grandes, lentitud
    - **Solución**: Implementar paginación con cursor o offset

### 🟢 Menores

13. **Sin Indexación Adecuada**
    - **Problema**: Algunas consultas frecuentes sin índices
    - **Riesgo**: Lentitud en consultas
    - **Solución**: Revisar y agregar índices según uso

14. **Sin Compresión de Imágenes**
    - **Problema**: Si se suben imágenes, no se optimizan
    - **Riesgo**: Almacenamiento y transferencia ineficiente
    - **Solución**: Implementar optimización de imágenes

15. **Sin Cache de Consultas Frecuentes**
    - **Problema**: Consultas repetidas a base de datos
    - **Riesgo**: Carga innecesaria en PostgreSQL
    - **Solución**: Implementar cache con Redis o en memoria

16. **Sin Monitoreo de Performance**
    - **Problema**: No hay métricas de rendimiento
    - **Riesgo**: Dificultad para detectar cuellos de botella
    - **Solución**: Implementar `@willsoto/nestjs-prometheus` o similar

17. **Sin Alertas**
    - **Problema**: No hay sistema de alertas
    - **Riesgo**: Problemas no detectados a tiempo
    - **Solución**: Integrar con CloudWatch, SNS, o similar

18. **Sin Backup Automatizado**
    - **Problema**: Dependencia de backups manuales de Supabase
    - **Riesgo**: Pérdida de datos
    - **Solución**: Configurar backups automátizados

## Despliegue

### Docker
```bash
# Construir y levantar
docker-compose up --build -d

# Ver logs
docker-compose logs -f api

# Detener
docker-compose down
```

### AWS EC2
- Instancia EC2 con Docker instalado
- Contenedor ejecutando en puerto 3000
- Variables de entorno configuradas en el contenedor
- Certificado SSL en `/app/global-bundle.pem` (montado como volumen)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Comandos de Desarrollo

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Desarrollo con hot-reload
npm run start:dev

# Build de producción
npm run build

# Linting
npm run lint

# Formateo
npm run format

# Seed de productos
npm run seed:products
```

## Convenciones

- **Imports**: Siempre con extensión `.js` (requerido por ESM)
- **Nombres**: camelCase para variables/functions, PascalCase para clases
- **DTOs**: Separados por acción (Create, Update)
- **Módulos**: Un módulo por dominio de negocio
- **Tests**: `*.spec.ts` para unit, `*.e2e-spec.ts` para e2e
- **Linting**: oxlint (no ESLint)
- **Formato**: Prettier con comas trailing y comillas simples

## Notas Adicionales

- El proyecto usa `strict: true` en TypeScript pero `strictPropertyInitialization: false` (patrón NestJS DI)
- `npm install` requiere `--legacy-peer-deps` por bug de npm 10.9.2
- `nest build` elimina `dist/` en cada ejecución (`deleteOutDir: true`)
- El cliente Prisma se genera en `src/generated/prisma/`
- Las migraciones se almacenan en `prisma/migrations/`
