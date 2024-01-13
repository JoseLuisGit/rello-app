FROM node:18 AS builder

WORKDIR /build

COPY package.json /build/package.json

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
