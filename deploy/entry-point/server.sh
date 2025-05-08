#!/bin/sh

# Espera o banco estar pronto (se necessário)
# ex: ./wait-for-it.sh db:5432 -- 

# Roda as migrations
npx prisma migrate deploy

# Inicia a aplicação
exec node dist/main.js