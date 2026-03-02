FROM node:22-alpine

# Install compilers
RUN apk add --no-cache python3 openjdk11 g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
