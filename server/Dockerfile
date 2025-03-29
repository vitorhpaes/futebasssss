FROM node:20-alpine

WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
COPY prisma ./prisma/
COPY scripts/init.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/init.sh && \
    npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["init.sh"]
CMD ["npm", "run", "start:prod"] 