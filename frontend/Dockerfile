# Stage 1: build React app
FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: serve with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Expose default Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
