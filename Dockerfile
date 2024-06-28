FROM node:16 as builder
WORKDIR /app
COPY . .
RUN npm i -f
RUN npm run build

CMD ["npm", "run", "dev"]