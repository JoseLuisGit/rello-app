FROM node:18

WORKDIR /app

COPY ./package.json /app/package.json

RUN npm install -g npm pm2 && npm install

COPY . /app

RUN npm run build:js

EXPOSE 3000

CMD ["npm", "run", "pm2"]
