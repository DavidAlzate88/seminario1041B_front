# Utilizar una imagen base de Node.js para construir la aplicación
FROM node:22-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /dist/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install --legacy-peer-deps --ignore-scripts

# Copiar el resto de los archivos de la aplicación
COPY public ./
COPY src ./
COPY angular.json ./
COPY tsconfig.app.json ./
COPY tsconfig.json ./
COPY tsconfig.spec.json ./

# Construir la aplicación Angular para producción
RUN npm run build --prod

# Utilizar una imagen base ligera para servir la aplicación (Nginx)
FROM nginx:alpine

# Crear un grupo y un usuario no privilegiado y Cambiar la propiedad de los directorios de Nginx al nuevo usuario
RUN addgroup -S app && adduser -S -G app app \
    && chown -R app:app /var/lib/nginx /var/cache/nginx /usr/share/nginx/html

# Cambiar al usuario no privilegiado para ejecutar Nginx
USER app

RUN rm /etc/nginx/conf.d/default.conf

# Copiar la configuración personalizada de Nginx (opcional, ver paso 2)
COPY nginx.conf /etc/nginx/conf.d/

# Copiar los archivos construidos de Angular desde la etapa de construcción
COPY --from=builder /app/dist/seminario1041-b-front /usr/share/nginx/html

# Exponer el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando para iniciar Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
