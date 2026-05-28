# ──────────────────────────────────────────
# STAGE 1: "builder" — compilăm TypeScript
# ──────────────────────────────────────────
FROM node:20-alpine AS builder

# Setăm folderul de lucru din interiorul containerului
WORKDIR /app

# Copiem DOAR package.json mai întâi (optimizare cache)
COPY package*.json ./

# Instalăm TOATE dependențele (inclusiv dev)
RUN npm ci

# Copiem restul codului
COPY . .

# Compilăm TypeScript → JavaScript
RUN npm run build

# ──────────────────────────────────────────
# STAGE 2: "runner" — rulăm doar ce e necesar
# ──────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Copiem package.json
COPY package*.json ./

# Instalăm DOAR dependențele de producție
RUN npm ci --only=production

# Copiem codul compilat din stage-ul anterior
COPY --from=builder /app/dist ./dist

# Expunem portul pe care ascultă aplicația
EXPOSE 3000

# Comanda de pornire
CMD ["node", "dist/index.js"]