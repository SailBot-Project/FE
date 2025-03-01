# 1단계: React 앱 빌드
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# 2단계: Nginx로 빌드된 파일 서빙
FROM nginx:alpine
WORKDIR /app
# React 앱 빌드된 파일을 Nginx가 제공할 경로로 복사
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx 기본 포트 80을 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
