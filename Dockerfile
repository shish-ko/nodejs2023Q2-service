# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /
COPY . .
RUN npm install
CMD ["npm", "run", "start:dev"]
EXPOSE 4000