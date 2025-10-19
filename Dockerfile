# frontend/Dockerfile

FROM node:18-alpine AS builder
WORKDIR /app

ARG SESSION_COOKIE_NAME=gdg_et_session
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
ARG NEXT_PUBLIC_URL=http://localhost:3000


ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV SESSION_COOKIE_NAME=$SESSION_COOKIE_NAME

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM node:18-alpine AS production

ARG SESSION_COOKIE_NAME=gdg_et_session

WORKDIR /app

ENV SESSION_COOKIE_NAME=$SESSION_COOKIE_NAME

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
