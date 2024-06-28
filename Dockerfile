FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN npm i -f
RUN npm run build

CMD ["npm", "run", "dev"]
