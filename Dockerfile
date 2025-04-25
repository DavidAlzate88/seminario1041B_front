# Etapa de construcción
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar solo los archivos necesarios para las dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install --legacy-peer-deps --ignore-scripts

COPY public ./public
COPY src ./src
COPY angular.json ./
COPY tsconfig.app.json ./
COPY tsconfig.json ./
COPY tsconfig.spec.json ./

RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Crear los directorios necesarios antes de cambiar la propiedad
# Crear un grupo y un usuario no privilegiado
RUN mkdir -p /var/lib/nginx /var/cache/nginx /usr/share/nginx/html /etc/nginx/conf.d /run/nginx && \
    addgroup -S app && adduser -S -G app app && \
    chown -R app:app /var/lib/nginx /var/cache/nginx /usr/share/nginx/html /etc/nginx/conf.d /run/nginx

# Cambiar al usuario no privilegiado para ejecutar Nginx
USER app

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist/seminario1041-b-front/browser /usr/share/nginx/html/seminario1041b

# Expose port 80
EXPOSE 80

# Comando para iniciar Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
