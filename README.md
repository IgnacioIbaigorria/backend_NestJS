# PuntoEco Gestión

API backend para gestionar una tienda de productos ecofriendly y su operación comercial diaria. La aplicación centraliza un catálogo de alternativas reutilizables, cosmética natural y productos de cuidado personal, junto con inventario, categorías, etiquetas, ventas, pagos, reposición de stock, caja y auditoría de cambios.

> Proyecto orientado a demostrar diseño modular, persistencia relacional, validación de datos, migraciones, containerización y despliegue automatizado.

## Funcionalidades

- **Catálogo ecofriendly:** productos de cuidado capilar, facial y corporal, higiene sustentable, cocina sin descartables, Bee wraps y complementos reutilizables.
- **Productos:** alta, edición, eliminación, búsqueda, filtrado por categoría y detección de bajo stock.
- **Catálogos:** administración de categorías y etiquetas asociadas a productos.
- **Ventas:** registro de ventas con cantidad, precio, total y pagos divididos por método.
- **Caja:** resumen de ventas, ganancias, gastos y balance neto para un período.
- **Reposición:** registro de entradas de stock con proveedor y costo.
- **Historial:** auditoría de cambios realizados sobre los productos.
- **Documentación interactiva:** Swagger disponible en `/api/docs`.
- **Autenticación:** Amazon Cognito User Pool con JWT y grupos como roles.
- **Usuarios:** gestión administrativa de usuarios y contraseñas de Cognito.

## Stack tecnológico

| Área | Tecnología |
| --- | --- |
| Backend | NestJS 12, TypeScript, Node.js 22 |
| API | REST, Swagger/OpenAPI |
| Persistencia | PostgreSQL, Prisma ORM 7 |
| Validación | `class-validator`, `class-transformer` |
| Infraestructura | Docker, Docker Compose, AWS EC2 |
| Base de datos administrada | Supabase |
| Automatización | GitHub Actions |
| Calidad | oxlint, Prettier, Vitest |

## Arquitectura

El backend sigue una arquitectura modular de NestJS. Cada dominio encapsula su controlador, servicio, DTOs y módulo, mientras que `PrismaModule` concentra el acceso a datos.

```text
Cliente HTTP
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
├── products/               # Catálogo ecofriendly y control de stock
├── categories/             # Categorías
├── tags/                   # Etiquetas
├── sales/                  # Ventas y pagos
├── caja/                   # Resúmenes y gastos
├── reposicion/             # Entradas de stock
├── history/                # Historial de cambios
└── auth/                   # Validación JWT de Cognito y autorización por roles

prisma/
├── schema.prisma           # Modelo relacional
└── migrations/             # Migraciones versionadas
```

La validación global usa `whitelist`, `forbidNonWhitelisted` y `transform`, por lo que los endpoints rechazan propiedades no declaradas en sus DTOs y convierten los valores de entrada al tipo esperado.

## Autenticación y autorización

La API valida **access tokens JWT emitidos por Amazon Cognito** mediante `aws-jwt-verify`. La validación comprueba la firma RSA usando las claves públicas JWKS del User Pool, el issuer, la expiración, el uso del token (`access`) y el `client_id`.

Todos los endpoints requieren:

```http
Authorization: Bearer <cognito-access-token>
```

Los grupos de Cognito se interpretan como roles:

| Grupo | Alcance |
| --- | --- |
| `ADMIN` | Acceso completo |
| `MANAGER` | Operación comercial y configuración del catálogo |
| `SELLER` | Consulta de productos y registro de ventas |
| `INVENTORY_MANAGER` | Productos, stock y reposiciones |
| `AUDITOR` | Consultas e historial |

Las operaciones de lectura requieren un token válido. Las operaciones de escritura además verifican el grupo del usuario mediante `RolesGuard`.

### Gestión de usuarios

Los endpoints `/users` requieren un access token cuyo usuario pertenezca al
grupo `ADMIN`. Permiten listar y consultar usuarios, crear usuarios con nombre
de usuario y contraseña, actualizar sus atributos o habilitación, restablecer
contraseñas y eliminarlos. Las contraseñas recibidas por la API deben tener
entre 8 y 99 caracteres e incluir mayúsculas, minúsculas, números y caracteres
especiales; Cognito aplica además la política configurada en el User Pool.

La API nunca persiste contraseñas: todas las operaciones se ejecutan mediante
las operaciones administrativas del User Pool de Cognito. Para crear un usuario
sin enviar una invitación, se usa `POST /users`:

```json
{
  "username": "vendedor01",
  "password": "UnaClaveSegura1!",
  "email": "vendedor01@puntoeco.com",
  "name": "Vendedor PuntoEco"
}
```

### Configuración de Cognito

1. Crear un **User Pool** en la misma región de AWS que uses para el proyecto.
2. Configurar el inicio de sesión con email.
3. Crear un **App client sin client secret** para el cliente externo que consumirá la API.
4. Crear los grupos `ADMIN`, `MANAGER`, `SELLER`, `INVENTORY_MANAGER` y `AUDITOR`.
5. Crear el usuario administrador inicial y asignarlo al grupo `ADMIN`.
6. Guardar el User Pool ID y el App client ID como variables de entorno:

```env
COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```

El cliente externo debe iniciar sesión en Cognito y enviar el **access token**, no el ID token, en cada request. Para Swagger, usar el botón **Authorize** y pegar `Bearer <access-token>`.

### Cognito y capa gratuita

Para User Pools nuevos en el nivel Lite, AWS muestra un tramo gratuito de los primeros **10.000 usuarios activos mensuales (MAUs)**. User Pools antiguos y cuentas elegibles pueden conservar un tramo de hasta **50.000 MAUs**. Verifica el nivel y el precio aplicable a tu cuenta y región en [Amazon Cognito Pricing](https://aws.amazon.com/cognito/pricing/).

Aunque el uso normal de una tienda pequeña suele quedar dentro del tramo gratuito, **SMS para MFA/recuperación y emails de verificación pueden generar cargos separados** mediante SNS/SES. Para empezar sin costos inesperados, usar email para verificación y recuperación, evitar Advanced Security Features hasta necesitarlas y configurar un presupuesto/alerta en AWS Billing.

### Variables necesarias en Docker

El archivo `.env` de la instancia EC2 debe incluir:

```env
DATABASE_URL=postgresql://...
PORT=3000
COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```

Después de actualizar estas variables:

```bash
docker compose up -d --build
docker compose logs --tail=100 api
```

## Catálogo inicial

El repositorio incluye `prisma/seed-products.mjs`, un script idempotente que carga el catálogo actualizado de PuntoEco Gestión:

- **12 categorías**: Capilar, Cuidado facial, Complementos, Cocina, Corporal, Cepillos, Cremas, Protectores diarios, Toallitas, Bee wraps, Sérum y Sin categoría.
- **97 productos** con sus precios de catálogo.
- Etiqueta `ecofriendly` para todo el catálogo.
- Etiqueta `sin stock` para los productos marcados como `SIN STOCK` en el documento de origen.
- `costPrice` calculado con un markup promedio del 75%: `costo = precio de venta / 1,75`.

El documento de origen informa precios y disponibilidad, pero no cantidades. Por eso el seed deja el `stock` inicial en `0`, para que la API pueda recibir las cantidades reales mediante reposiciones.

Para cargar o actualizar todo el catálogo:

```bash
npm run seed:products
```

El comando es seguro de ejecutar más de una vez: actualiza productos existentes por nombre y evita duplicados.

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
| `/users` | Gestión de usuarios de Cognito (solo `ADMIN`) |

## Estado del proyecto

El sistema cuenta con un flujo funcional para una tienda ecofriendly: catálogo inicial cargable desde el documento comercial, inventario, ventas, caja, reposición y trazabilidad. También incluye una API documentada, persistencia con migraciones y despliegue automatizado. Las siguientes evoluciones naturales son incorporar autenticación y autorización por roles, integración con Amazon Cognito y observabilidad de producción.

## Sobre el proyecto

Este proyecto fue desarrollado como una solución práctica para gestionar inventario y operaciones comerciales, aplicando buenas prácticas de arquitectura backend, persistencia de datos y despliegue automatizado.

Si quieres conocer más sobre las decisiones técnicas o el proceso de desarrollo, puedes explorar el código, la documentación de la API y el historial de cambios del repositorio.
