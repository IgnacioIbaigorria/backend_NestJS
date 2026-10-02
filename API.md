# API de Gestión de Stock

Backend NestJS con PostgreSQL (Supabase) y Prisma ORM.

## Endpoints

### Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/products` | Crear producto |
| GET | `/products` | Listar productos (filtros: `?categoryId=`, `?search=`) |
| GET | `/products/low-stock` | Productos con stock bajo |
| GET | `/products/:id` | Obtener producto por ID |
| PATCH | `/products/:id` | Actualizar producto |
| DELETE | `/products/:id` | Eliminar producto |

### Categorías

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/categories` | Crear categoría |
| GET | `/categories` | Listar categorías |
| GET | `/categories/:id` | Obtener categoría por ID |
| PATCH | `/categories/:id` | Actualizar categoría |
| DELETE | `/categories/:id` | Eliminar categoría |

### Etiquetas

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/tags` | Crear etiqueta |
| GET | `/tags` | Listar etiquetas |
| GET | `/tags/:id` | Obtener etiqueta por ID |
| PATCH | `/tags/:id` | Actualizar etiqueta |
| DELETE | `/tags/:id` | Eliminar etiqueta |

### Ventas

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/sales` | Registrar venta (descuenta stock automáticamente) |
| GET | `/sales` | Listar ventas (filtros: `?productId=`, `?from=`, `?to=`) |
| GET | `/sales/summary` | Resumen de ventas (filtros: `?from=`, `?to=`) |
| GET | `/sales/:id` | Obtener venta por ID |

### Caja

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/caja/open` | Abrir caja |
| GET | `/caja/open` | Ver caja abierta actual |
| PATCH | `/caja/:id/close` | Cerrar caja |
| GET | `/caja` | Listar cajas |
| GET | `/caja/:id` | Obtener caja por ID |

### Reposición

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/reposicion` | Registrar reposición (suma stock automáticamente) |
| GET | `/reposicion` | Listar reposiciones (filtro: `?productId=`) |
| GET | `/reposicion/:id` | Obtener reposición por ID |

### Historial

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/history` | Listar historial (filtros: `?productId=`, `?field=`) |
| GET | `/history/:id` | Obtener registro por ID |

## Ejemplos de uso

### Crear producto
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop HP",
    "sku": "LAP-001",
    "price": 999.99,
    "stock": 10,
    "categoryId": "uuid-de-categoria",
    "tagIds": ["uuid-de-etiqueta"]
  }'
```

### Registrar venta
```bash
curl -X POST http://localhost:3000/sales \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "uuid-de-producto",
    "quantity": 2
  }'
```

### Abrir caja
```bash
curl -X POST http://localhost:3000/caja/open \
  -H "Content-Type: application/json" \
  -d '{"openingBalance": 100.00}'
```

## Despliegue con Docker

```bash
# Construir y levantar
docker-compose up --build -d

# Ver logs
docker-compose logs -f api

# Detener
docker-compose down
```
