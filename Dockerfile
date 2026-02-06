# ===== BUILD STAGE =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ===== RUN STAGE =====
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy Angular output (your project folder)
COPY --from=build /app/dist/akida /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]