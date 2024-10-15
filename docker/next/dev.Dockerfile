FROM node:20-alpine

WORKDIR /app

COPY app /app
COPY .env /app.env

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000