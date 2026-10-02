# ─── Stage 1: Build ─────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig*.json nest-cli.json ./
COPY src ./src

RUN npm run build

# ─── Stage 2: Production ────────────────────────────────────
FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=dev

# Instalar solo prisma CLI para migraciones
RUN npm install --legacy-peer-deps prisma@7.10.0

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated
COPY prisma ./prisma
COPY prisma7.config.ts ./

# Script de entrada: ejecuta migraciones y arranca la API
RUN printf '#!/bin/sh\nnpx prisma migrate deploy\nnode dist/main.js\n' > /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

EXPOSE 3000

CMD ["sh", "/app/entrypoint.sh"]
