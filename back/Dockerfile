FROM node:22.14.0

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

# Prisma se queda copiado, en caso de migraciones o generación de cliente
COPY prisma ./prisma

# Entrypoint si aún lo usas
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
