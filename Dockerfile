# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:18-alpine
WORKDIR /app
COPY --from=0 /app/node_modules /app/node_modules
CMD ["npm", "run", "start:dev:migrate"]
EXPOSE $PORT