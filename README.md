# Stock Management Platform

Backend y frontend para gestionar el inventario y la operación diaria de un comercio. La aplicación centraliza productos, categorías, etiquetas, ventas, pagos, reposición de stock, caja y auditoría de cambios en una API REST con documentación OpenAPI.

> Proyecto full-stack orientado a demostrar diseño modular, persistencia relacional, validación de datos, migraciones, containerización y despliegue automatizado.

## Funcionalidades

- **Productos:** alta, edición, eliminación, búsqueda, filtrado por categoría y detección de bajo stock.
- **Catálogos:** administración de categorías y etiquetas asociadas a productos.
- **Ventas:** registro de ventas con cantidad, precio, total y pagos divididos por método.
- **Caja:** resumen de ventas, ganancias, gastos y balance neto para un período.
- **Reposición:** registro de entradas de stock con proveedor y costo.
- **Historial:** auditoría de cambios realizados sobre los productos.
- **Documentación interactiva:** Swagger disponible en `/api/docs`.

## Stack tecnológico

| Área | Tecnología |
| --- | --- |
| Backend | NestJS 12, TypeScript, Node.js 22 |
| API | REST, Swagger/OpenAPI |
| Persistencia | PostgreSQL, Prisma ORM 7 |
| Validación | `class-validator`, `class-transformer` |
| Frontend | React 18, Vite, React Router, Axios |
| Infraestructura | Docker, Docker Compose, AWS EC2 |
| Base de datos administrada | Supabase |
| Automatización | GitHub Actions |
| Calidad | oxlint, Prettier, Vitest |

## Arquitectura

El backend sigue una arquitectura modular de NestJS. Cada dominio encapsula su controlador, servicio, DTOs y módulo, mientras que `PrismaModule` concentra el acceso a datos.

```text
Cliente web
    │
    ▼
Controladores REST
    │  validación global de DTOs
    ▼
Servicios de dominio
    │
    ▼
PrismaService ─── Prisma ORM ─── PostgreSQL (Supabase)
```

### Organización principal

```text
src/
├── main.ts                 # Bootstrap, CORS, validación y Swagger
├── app.module.ts           # Composition root
├── prisma/                 # Cliente Prisma y conexión a PostgreSQL
├── products/               # Productos y control de stock
├── categories/             # Categorías
├── tags/                   # Etiquetas
├── sales/                  # Ventas y pagos
├── caja/                   # Resúmenes y gastos
├── reposicion/             # Entradas de stock
└── history/                # Historial de cambios

frontend/
├── src/App.jsx             # Navegación de la aplicación web
├── src/pages/              # Vistas por dominio
└── src/services/api.js     # Cliente Axios para la API

prisma/
├── schema.prisma           # Modelo relacional
└── migrations/             # Migraciones versionadas
```

La validación global usa `whitelist`, `forbidNonWhitelisted` y `transform`, por lo que los endpoints rechazan propiedades no declaradas en sus DTOs y convierten los valores de entrada al tipo esperado.

## Modelo de datos

El dominio se apoya en PostgreSQL y mantiene relaciones explícitas entre:

- `Product`, `Category` y `Tag` para el catálogo.
- `Product` y `Sale` para descontar y consultar ventas.
- `Sale` y `Payment` para soportar pagos divididos.
- `Product` y `Reposicion` para registrar ingresos de stock.
- `Product` y `ProductHistory` para conservar trazabilidad.
- `Expense` y `Caja` para los movimientos y resúmenes financieros.

Las migraciones se aplican automáticamente al iniciar el contenedor de producción con `prisma migrate deploy`.

## Despliegue actual

Según la configuración versionada del repositorio:

- **Backend:** desplegado en una instancia **AWS EC2** mediante Docker Compose.
- **API pública actual:** `http://34.227.197.241:3000`
- **Swagger:** `http://34.227.197.241:3000/api/docs`
- **Base de datos:** PostgreSQL administrado en **Supabase**.
- **Frontend:** incluido en este repositorio como aplicación React/Vite. El workflow de producción actual automatiza el despliegue del backend; el frontend puede ejecutarse de forma independiente.

> Las credenciales, claves SSH y la cadena de conexión de base de datos se administran como secretos o variables de entorno y no forman parte del repositorio.

### Flujo CI/CD

Cada pull request hacia `main` ejecuta:

1. Instalación reproducible de dependencias.
2. Generación del cliente Prisma.
3. Lint con oxlint.
4. Build de la aplicación.
5. Tests unitarios con Vitest.

Cada push a `main` que supera esas validaciones conecta por SSH con EC2, actualiza el código y ejecuta:

```bash
docker compose up -d --build
```

El contenedor arranca aplicando las migraciones pendientes y luego inicia la API.

## Ejecución local

### Requisitos

- Node.js 22+
- npm 10+
- PostgreSQL accesible mediante `DATABASE_URL`
- Docker y Docker Compose (opcional, para ejecutar el stack containerizado)

### Backend

```bash
git clone https://github.com/IgnacioIbaigorria/backend_NestJS.git
cd backend_NestJS

npm install --legacy-peer-deps
npx prisma generate
```

Crear un archivo `.env` en la raíz:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
PORT=3000
```

Aplicar las migraciones y levantar el backend:

```bash
npx prisma migrate deploy
npm run start:dev
```

La API quedará disponible en `http://localhost:3000` y Swagger en `http://localhost:3000/api/docs`.

### Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecuta por defecto en `http://localhost:3001`. Vite tiene configurado un proxy `/api` para desarrollo; el cliente Axios incluido actualmente apunta a la API desplegada, por lo que para trabajar completamente contra `localhost` hay que ajustar esa base URL.

## Comandos útiles

Desde la raíz del proyecto:

| Comando | Uso |
| --- | --- |
| `npm run start:dev` | Backend en modo desarrollo con watch |
| `npm run build` | Compila el backend en `dist/` |
| `npm run lint` | Ejecuta oxlint |
| `npm run test` | Ejecuta tests unitarios |
| `npm run test:e2e` | Ejecuta tests end-to-end |
| `npm run test:cov` | Genera reporte de cobertura |
| `npm run format` | Formatea el código TypeScript |
| `docker compose up --build` | Levanta la API en un contenedor |

## API principal

Todos los endpoints usan JSON y están documentados en Swagger.

| Recurso | Operaciones destacadas |
| --- | --- |
| `/products` | CRUD, búsqueda, filtro por categoría y `/low-stock` |
| `/categories` | CRUD de categorías |
| `/tags` | CRUD de etiquetas |
| `/sales` | Crear, consultar, filtrar por fechas y `/summary` |
| `/caja` | Resumen, gastos y balance |
| `/reposicion` | Registrar y consultar reposiciones |
| `/history` | Consultar cambios de productos |

## Estado del proyecto

El sistema cuenta con un flujo funcional de inventario y operación comercial, una API documentada, persistencia con migraciones y despliegue automatizado. Las siguientes evoluciones naturales serían incorporar autenticación y autorización por roles, separar la configuración del frontend por ambiente y añadir observabilidad y métricas de producción.

## Licencia

Proyecto privado de portfolio. No se autoriza su redistribución o uso comercial sin permiso del autor.
