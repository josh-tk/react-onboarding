FROM node:20-alpine

WORKDIR /app

COPY app /app
COPY .env /app.env

EXPOSE 3000