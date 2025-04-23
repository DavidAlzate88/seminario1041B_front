# Utilizar una imagen base de Node.js para construir la aplicación
FROM node:22-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install --legacy-peer-deps
# o
# RUN yarn install --frozen-lockfile

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación Angular para producción
RUN npm run build -- --prod

# Utilizar una imagen base ligera para servir la aplicación (Nginx)
FROM nginx:alpine

# Eliminar la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar la configuración personalizada de Nginx (opcional, ver paso 2)
COPY nginx.conf /etc/nginx/conf.d/

# Copiar los archivos construidos de Angular desde la etapa de construcción
COPY --from=builder /app/dist/mi-app-angular /usr/share/nginx/html

# Exponer el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
