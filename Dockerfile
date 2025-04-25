# Etapa de construcción
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar solo los archivos necesarios para las dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install --legacy-peer-deps --ignore-scripts

# Copiar el resto de los archivos de la aplicación
COPY public ./public
COPY src ./src
COPY angular.json ./
COPY tsconfig.app.json ./
COPY tsconfig.json ./
COPY tsconfig.spec.json ./

RUN npm install --ignore-scripts -g @angular/cli && \
    addgroup -S appuser \
    && adduser -S appuser -G appuser

USER appuser

# Comando para iniciar Nginx
ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
