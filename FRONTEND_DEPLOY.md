# Despliegue Frontend en S3 + CI/CD

## Problema actual del frontend

El buscador no funciona porque `products` está vacío cuando escribes. Esto pasa porque:
1. `loadProducts()` es asíncrono
2. `handleSearch` usa `products` que aún no se ha cargado

## Solución al frontend

El código ya tiene logs. Si ves "Products: 0" en la consola, el problema es que el backend no responde o tarda demasiado.

**Verificar en consola del navegador (F12):**
```
Productos cargados: 1
Buscando: cep | Products: 1 | Encontrados: 1
```

If you see `Products: 0`, the backend is not responding.

---

## Arquitectura de despliegue

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   CloudFront    │────▶│  S3 (Frontend)  │     │   EC2 (Backend) │
│   (CDN + SSL)   │     │  React SPA      │     │   NestJS API    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Estructura del repositorio

```
backend_NEST/
├── backend/          → EC2 (NestJS)
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── docker-compose.yml
└── frontend/         → S3 + CloudFront (React)
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## Paso 1: Crear bucket S3

### En AWS Console

1. Ve a **S3** → **Create bucket**
2. Nombre: `stock-frontend-tu-nombre` (debe ser único global)
3. **Desactivar** "Block all public access"
4. Click **Create bucket**

### Configurar bucket para hosting estático

1. Selecciona tu bucket → **Properties**
2. **Static website hosting** → **Edit**
3. **Enable**
4. Index document: `index.html`
5. Error document: `index.html`
6. Click **Save changes**

### Configurar permisos

1. Selecciona tu bucket → **Permissions**
2. **Bucket policy** → **Edit**
3. Pega esto (cambia `tu-bucket` por el nombre de tu bucket):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tu-bucket/*"
    }
  ]
}
```

4. Click **Save changes**

---

## Paso 2: Configurar GitHub Actions

### Crear archivo `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: cd frontend && npm ci
      - run: cd frontend && npm run build

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - uses: easingthemes/ssh-deploy@v4
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_KEY }}
          REMOTE_HOST: ${{ secrets.EC2_IP }}
          REMOTE_USER: ubuntu
          SOURCE: "./backend/"
          TARGET: "/home/ubuntu/backend"
      - name: Restart backend
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.EC2_IP }}
          username: ubuntu
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd ~/backend
            docker-compose down
            docker-compose up --build -d

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: cd frontend && npm ci && npm run build
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync frontend/build/ s3://tu-bucket --delete
      - run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_ID }} --paths "/*"
```

---

## Paso 3: Configurar Secrets en GitHub

1. Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Agrega estos secrets:

| Nombre | Valor |
|--------|-------|
| `SSH_KEY` | Contenido de tu archivo `.pem` |
| `EC2_IP` | IP pública de tu EC2 |
| `AWS_ACCESS_KEY` | Tu Access Key de AWS |
| `AWS_SECRET_KEY` | Tu Secret Key de AWS |
| `CLOUDFRONT_ID` | ID de tu distribución CloudFront |

---

## Paso 4: Crear distribución CloudFront (opcional pero recomendado)

1. Ve a AWS Console → **CloudFront** → **Create distribution**
2. **Origin domain**: selecciona tu bucket S3
3. **Default root object**: `index.html`
4. **Viewer protocol policy**: Redirect HTTP to HTTPS
5. Click **Create distribution**
6. Espera ~15 min para que se despliegue
7. Copia el **Distribution domain name** (ej: `d1234.cloudfront.net`)

---

## Paso 5: Probar el despliegue

```bash
# Hacer push al repositorio
git add .
git commit -m "Add CI/CD workflow"
git push
```

Ve a tu repositorio → **Actions** para ver el deploy en acción.

---

## Resumen de servicios

| Servicio | Uso | Costo |
|----------|-----|-------|
| S3 | Hosting frontend | ~$0.02/mes |
| CloudFront | CDN + SSL | ~$0.00 |
| EC2 | Backend | Free tier 12 meses |
| RDS | Base de datos | Free tier 12 meses |
| GitHub Actions | CI/CD | 2,000 min/mes gratis |

---

## Comandos útiles

```bash
# Ver logs del backend en EC2
ssh -i "tu-key.pem" ubuntu@TU_IP_EC2
cd ~/backend
docker-compose logs -f

# Subir frontend manualmente (sin CI/CD)
cd frontend
npm run build
aws s3 sync build/ s3://tu-bucket --delete

# Invalidar caché de CloudFront
aws cloudfront create-invalidation --distribution-id TU_ID --paths "/*"
```

---

## Checklist

- [ ] Bucket S3 creado con acceso público
- [ ] Bucket policy configurado
- [ ] Static website hosting habilitado
- [ ] GitHub Actions workflow creado
- [ ] Secrets configurados en GitHub
- [ ] CloudFront distribution creada
- [ ] Primer deploy automático funcionando
