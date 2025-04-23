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
COPY nginx.conf ./

# Construir la aplicación Angular para producción
RUN npm run build --prod

# Etapa de producción (Nginx)
FROM nginx:alpine

# Crear los directorios si no existen (más robusto)
# Eliminar la configuración por defecto de Nginx
# Crear un grupo y un usuario no privilegiado y Cambiar la propiedad de los directorios de Nginx
RUN mkdir -p /var/lib/nginx /var/cache/nginx /usr/share/nginx/html && \
    rm /etc/nginx/conf.d/default.conf && \
    addgroup -S app && adduser -S -G app app && \
    chown -R app:app /var/lib/nginx /var/cache/nginx /usr/share/nginx/html

# Cambiar al usuario no privilegiado
USER app

# Copiar la configuración personalizada de Nginx (si la tienes)
COPY nginx.conf /etc/nginx/conf.d/

# Copiar los archivos construidos de Angular desde la etapa de construcción
COPY --from=builder /app/dist/seminario1041-b-front /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Comando para iniciar Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
