# Plan de Despliegue en AWS - Gestión de Stock

## Arquitectura Propuesta

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   CloudFront    │────▶│  S3 (Frontend)  │     │   EC2 (Backend) │
│   (CDN + SSL)   │     │  React SPA      │     │   NestJS API    │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │  RDS PostgreSQL │
                                                │  (Free Tier)    │
                                                └─────────────────┘
```

## Servicios AWS Recomendados (Free Tier)

### 1. Frontend React SPA

| Servicio | Descripción | Free Tier |
|----------|-------------|-----------|
| **S3** | Hosting de archivos estáticos | 5 GB almacenamiento, 20,000 GET/mes |
| **CloudFront** | CDN + SSL gratuito | 1 TB transferencia/mes |

**Ventajas:**
- Muy barato (casi gratis)
- Escalable automáticamente
- SSL incluido

### 2. Backend NestJS

| Servicio | Descripción | Free Tier |
|----------|-------------|-----------|
| **EC2 t2.micro/t3.micro** | Servidor virtual | 750 horas/mes por 12 meses |

**Ventajas:**
- Control total
- Puede correr Docker
- Fácil de configurar

### 3. Base de Datos PostgreSQL

| Servicio | Descripción | Free Tier |
|----------|-------------|-----------|
| **RDS PostgreSQL t2.micro/t3.micro** | Base de datos gestionada | 750 horas/mes por 12 meses |

**Ventajas:**
- Backups automáticos
- Escalable
- Sin mantenimiento

## Pasos de Despliegue

### Paso 1: Crear la Base de Datos RDS

```bash
# 1. Ir a RDS Console
# 2. Crear base de datos PostgreSQL
# 3. Configuración:
#    - Engine: PostgreSQL
#    - Version: 16.x
#    - Instance class: db.t2.micro (free tier)
#    - Storage: 20 GB (free tier)
#    - Public access: Yes (para desarrollo)
#    - Security group: permitir puerto 5432 desde tu IP
```

### Paso 2: Crear el Backend en EC2

```bash
# 1. Lanzar instancia EC2 t2.micro (Ubuntu 22.04)
# 2. Security Group: permitir puertos 22 (SSH), 3000 (API)
# 3. Conectar por SSH e instalar dependencias:

sudo apt update
sudo apt install -y nodejs npm docker.io docker-compose
sudo usermod -aG docker $USER

# 4. Clonar el repositorio
git clone <tu-repo>
cd backend_NEST

# 5. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de RDS

# 6. Construir y levantar con Docker
docker-compose up --build -d
```

### Paso 3: Crear el Frontend React

```bash
# 1. Crear app React
npx create-react-app frontend
cd frontend

# 2. Instalar dependencias
npm install axios react-router-dom

# 3. Configurar API URL en .env
echo "REACT_APP_API_URL=http://<EC2_PUBLIC_IP>:3000" > .env

# 4. Construir para producción
npm run build

# 5. Subir a S3
aws s3 sync build/ s3://<tu-bucket-name>
```

### Paso 4: Configurar CloudFront

```bash
# 1. Crear distribución CloudFront
# 2. Origin: S3 bucket
# 3. Default root object: index.html
# 4. Error pages: 404 -> index.html (para SPA)
```

## Estimación de Costos (Free Tier)

| Servicio | Costo mensual |
|----------|---------------|
| S3 | ~$0.02 |
| CloudFront | ~$0.00 |
| EC2 t2.micro | $0.00 (free tier) |
| RDS t2.micro | $0.00 (free tier) |
| **Total** | **~$0.02/mes** |

## Alternativas Más Simples (Recomendado para Pruebas)

### Opción A: Todo en un solo EC2

```
┌─────────────────────────────────────┐
│           EC2 t2.micro              │
│  ┌─────────┐  ┌─────────┐  ┌─────┐ │
│  │ Frontend│  │ Backend │  │ DB  │ │
│  │ (Nginx) │  │ (NestJS)│  │(PG) │ │
│  └─────────┘  └─────────┘  └─────┘ │
└─────────────────────────────────────┘
```

**Ventajas:**
- Un solo servidor que maneja todo
- Más fácil de configurar
- Menos servicios que administrar

### Opción B: Render/Railway (No AWS pero más simple)

| Servicio | Free Tier |
|----------|-----------|
| Render | 750 horas/mes |
| Railway | $5 crédito/mes |

## Checklist de Seguridad

- [ ] Cambiar contraseñas por defecto
- [ ] Configurar Security Groups restrictivos
- [ ] Usar variables de entorno (no hardcodear credenciales)
- [ ] Habilitar HTTPS con CloudFront
- [ ] Configurar backups automáticos en RDS

## Comandos Útiles

```bash
# Ver logs del backend
docker logs -f backend_nest-api-1

# Conectar a RDS
psql -h <rds-endpoint> -U postgres -d stockdb

# Reiniciar servicios
docker-compose restart

# Ver estado de contenedores
docker-compose ps
```

## Notas Importantes

1. **Free Tier expira a los 12 meses** - después hay cargos
2. **RDS tiene límite de 750 horas/mes** - si lo dejas corriendo 24/7 se agota
3. **EC2 t2.micro tiene 750 horas/mes** - suficiente para una instancia
4. **S3 tiene 5 GB gratis** - más que suficiente para el frontend

## Próximos Pasos

1. [ ] Crear cuenta AWS si no tienes
2. [ ] Crear base de datos RDS
3. [ ] Lanzar instancia EC2
4. [ ] Configurar Security Groups
5. [ ] Desplegar backend
6. [ ] Crear frontend React
7. [ ] Desplegar frontend en S3
8. [ ] Configurar CloudFront
9. [ ] Probar la aplicación
