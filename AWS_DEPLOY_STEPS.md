# Guía de Despliegue en AWS - Paso a Paso

## Estado Actual
- [x] Cuenta AWS con free tier
- [x] Base de datos RDS creada
- [x] Instancia EC2 creada
- [ ] Conectar por SSH
- [ ] Instalar dependencias
- [ ] Desplegar app
- [ ] Configurar CI/CD

---

## Paso 1: Conectar por SSH desde Windows

### Problema: "ssh no se reconoce como comando"

**Solución 1: Usar PowerShell con OpenSSH (Windows 10/11)**

1. Abre PowerShell como Administrador
2. Ejecuta:
```powershell
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```
3. Reinicia PowerShell
4. Prueba: `ssh -V`

**Solución 2: Usar PuTTY (más fácil)**

1. Descarga PuTTY: https://www.putty.org/
2. Abre PuTTY
3. Configura:
   - **Host Name**: `ubuntu@TU_IP_EC2` (ej: `ubuntu@54.123.45.67`)
   - **Port**: 22
   - **Connection type**: SSH
4. En **Connection → SSH → Auth**:
   - Browse → selecciona tu archivo `.pem` (o conviértelo a `.ppk` con PuTTYgen)
5. Click **Open**
6. Acepta el fingerprint

**Solución 3: Usar Windows Terminal + WSL**

```bash
# Instalar WSL
wsl --install

# En WSL
ssh -i "stock-key.pem" ubuntu@TU_IP_EC2
```

---

## Paso 2: Instalar dependencias en EC2

Una vez conectado por SSH, ejecuta:

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
sudo apt install -y docker.io docker-compose

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
newgrp docker

# Verificar instalación
docker --version
docker-compose --version
```

---

## Paso 3: Preparar el proyecto en EC2

```bash
# Crear directorio del proyecto
mkdir ~/stock-app
cd ~/stock-app

# Crear archivo .env
nano .env
```

Pega esto en el archivo `.env` (cambia los valores):

```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD@TU_RDS_ENDPOINT:5432/stockdb"
PORT=3000
```

Guarda: `Ctrl+O` → `Enter` → `Ctrl+X`

---

## Paso 4: Subir archivos desde tu máquina local

### Opción A: Usar SCP (PowerShell con OpenSSH)

```powershell
# Desde tu carpeta del proyecto
scp -i "stock-key.pem" -r .env ubuntu@TU_IP_EC2:~/stock-app/
scp -i "stock-key.pem" -r src ubuntu@TU_IP_EC2:~/stock-app/
scp -i "stock-key.pem" -r prisma ubuntu@TU_IP_EC2:~/stock-app/
scp -i "stock-key.pem" -r package*.json ubuntu@TU_IP_EC2:~/stock-app/
scp -i "stock-key.pem" -r Dockerfile docker-compose.yml ubuntu@TU_IP_EC2:~/stock-app/
```

### Opción B: Usar Git (más fácil)

```bash
# En EC2
cd ~/stock-app
git clone https://github.com/TU_USUARIO/backend_NEST.git .
```

### Opción C: Usar VS Code Remote SSH

1. Instala extensión "Remote - SSH" en VS Code
2. `Ctrl+Shift+P` → "Remote-SSH: Connect to Host"
3. Agrega: `ssh -i "stock-key.pem" ubuntu@TU_IP_EC2`
4. Abre la carpeta `/home/ubuntu/stock-app`

---

## Paso 5: Levantar la aplicación

En EC2:

```bash
cd ~/stock-app

# Construir y levantar
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Ver contenedores
docker-compose ps
```

---

## Paso 6: Probar la aplicación

```bash
# Probar API localmente en EC2
curl http://localhost:3000/products

# Probar desde tu navegador
# Abre: http://TU_IP_EC2:3000/api/docs
```

Si ves Swagger, todo funciona.

---

## Paso 7: Configurar GitHub Actions para CI/CD

### 7.1 Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre: `backend_NEST`
3. Click "Create repository"

### 7.2 Subir tu código

```bash
# En tu máquina local
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/backend_NEST.git
git push -u origin main
```

### 7.3 Configurar Secrets en GitHub

1. Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Agrega estos secrets:

| Nombre | Valor |
|--------|-------|
| `SSH_KEY` | Contenido de tu archivo `stock-key.pem` |
| `EC2_IP` | IP pública de tu EC2 (ej: `54.123.45.67`) |
| `RDS_ENDPOINT` | Endpoint de RDS (ej: `stockdb.abc123.us-east-1.rds.amazonaws.com`) |
| `RDS_PASSWORD` | Tu password de RDS |

### 7.4 Crear archivo de GitHub Actions

Crea la carpeta `.github/workflows/` en tu proyecto y el archivo `deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
      
      - name: Install dependencies
        run: npm ci --legacy-peer-deps
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to EC2
        uses: easingthemes/ssh-deploy@v4
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_KEY }}
          REMOTE_HOST: ${{ secrets.EC2_IP }}
          REMOTE_USER: ubuntu
          SOURCE: "./"
          TARGET: "/home/ubuntu/stock-app"
      
      - name: Restart Docker
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.EC2_IP }}
          username: ubuntu
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd ~/stock-app
            docker-compose down
            docker-compose up --build -d
```

### 7.5 Probar el CI/CD

```bash
git add .
git commit -m "Add CI/CD workflow"
git push
```

Ve a tu repositorio → **Actions** para ver el deploy en acción.

---

## Resumen de datos necesarios

| Dato | Ejemplo | Dónde encontrarlo |
|------|---------|-------------------|
| EC2 IP | `54.123.45.67` | EC2 Console → Instancias → IPv4 Public IP |
| RDS Endpoint | `stockdb.abc123.us-east-1.rds.amazonaws.com` | RDS Console → Tu DB → Connectivity |
| RDS Password | `tu_password` | La que creaste al hacer RDS |
| SSH Key | `stock-key.pem` | Lo descargaste al crear EC2 |
| GitHub Token | (automático) | Se configura solo |

---

## Comandos útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar contenedores
docker-compose restart

# Detener todo
docker-compose down

# Ver estado
docker-compose ps

# Conectar a la base de datos
psql -h TU_RDS_ENDPOINT -U postgres -d stockdb

# Ver uso de recursos
htop
```

---

## Problemas comunes

### "Permission denied (publickey)"
- Verifica que usas el archivo `.pem` correcto
- En PuTTY: convierte el `.pem` a `.ppk` con PuTTYgen

### "Connection refused"
- Verifica que el Security Group permite puerto 3000 desde 0.0.0.0/0
- Verifica que la app está corriendo: `docker-compose ps`

### "Database connection failed"
- Verifica el endpoint de RDS en `.env`
- Verifica que el Security Group de RDS permite conexiones desde EC2

---

## Próximos pasos

- [ ] Frontend React en S3
- [ ] Dominio personalizado
- [ ] HTTPS con CloudFront
- [ ] Monitoreo con CloudWatch
