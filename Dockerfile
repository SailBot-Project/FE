
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build


FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/build /build