# Dockerfile for Nginx
FROM nginx:alpine

COPY app/public /usr/share/nginx/html
RUN apk add --no-cache curl

# Copy custom Nginx config
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf