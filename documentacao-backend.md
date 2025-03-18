# Documentação do Projeto Back-end

Este documento descreve os padrões, estruturas e tecnologias utilizadas no back-end do projeto Futebass-IA.

## Estrutura de Camadas

### 1. Módulos (`/src/modules`)

A aplicação está organizada em módulos seguindo o padrão do NestJS, onde cada módulo é uma unidade funcional responsável por uma parte específica da aplicação. Os principais módulos são:

- **Auth (`/modules/auth`)**: Responsável pela autenticação e autorização
  - Controllers: Endpoints para login e registro
  - Services: Lógica de negócios para autenticação
  - Guards: Proteção de rotas
  - Strategies: Implementações de estratégias de autenticação (JWT)
  - DTOs: Objetos de transferência de dados para requisições de autenticação

- **Users (`/modules/users`)**: Gerenciamento de usuários
  - Controllers: Endpoints para CRUD de usuários
  - Services: Lógica de negócios para usuários
  - DTOs: Objetos de transferência de dados para usuários
  - Entities: Representação de entidades de usuário

- **Sessions (`/modules/sessions`)**: Gerenciamento de sessões de jogos
  - Controllers: Endpoints para CRUD de sessões
  - Services: Lógica de negócios para sessões

- **Teams (`/modules/teams`)**: Gerenciamento de times
  - Controllers: Endpoints para CRUD de times
  - Services: Lógica de negócios para times

- **Player Sessions (`/modules/player-sessions`)**: Gerenciamento da relação entre jogadores e sessões
  - Controllers: Endpoints para gerenciar jogadores em sessões
  - Services: Lógica de negócios para alocação de jogadores

- **Game Results (`/modules/game-results`)**: Gerenciamento de resultados de jogos
  - Controllers: Endpoints para registrar e consultar resultados
  - Services: Lógica de negócios para resultados

- **Player Favorites (`/modules/player-favorites`)**: Gerenciamento de jogadores favoritos
  - Controllers: Endpoints para favoritar/desfavoritar jogadores
  - Services: Lógica de negócios para favoritos

- **Prisma (`/modules/prisma`)**: Camada de acesso ao banco de dados
  - Service: Singleton para conexão com o banco de dados

### 2. Common (`/src/common`)

Contém componentes compartilhados entre diferentes módulos da aplicação:

- **Decorators**: Decoradores personalizados
- **Exceptions**: Classes de exceção customizadas
- **Filters**: Filtros de exceção para tratamento padronizado de erros
- **Guards**: Guards de autenticação e autorização
- **Interceptors**: Interceptadores para transformação de dados
- **Middlewares**: Middlewares da aplicação

### 3. Prisma (`/prisma`)

Contém a configuração do ORM Prisma:

- **schema.prisma**: Define o modelo de dados da aplicação
- **migrations**: Migrações do banco de dados

## Padrões de Código

### 1. Arquitetura Modular

- Cada módulo contém seus próprios controllers, services, DTOs e entidades
- Separação clara de responsabilidades em cada camada
- Injeção de dependências para acoplamento fraco

### 2. Padrão RESTful

- Endpoints seguem convenções REST (GET, POST, PUT, DELETE)
- Respostas padronizadas para sucesso e erro
- Uso de códigos HTTP apropriados

### 3. DTOs (Data Transfer Objects)

- Classes separadas para entrada e saída de dados
- Validação de dados usando class-validator
- Documentação de API com decoradores do Swagger

### 4. Autenticação e Autorização

- Estratégia JWT para autenticação
- Guards para proteger rotas
- Roles para controle de acesso baseado em funções

### 5. Acesso a Dados

- Uso do Prisma como ORM
- Migrations para controle de versão do banco de dados
- Transações para operações que envolvem múltiplas entidades

## Tecnologias e Ferramentas

### 1. Framework

- **NestJS**: Framework Node.js progressivo para construção de aplicações server-side eficientes e escaláveis

### 2. Linguagem

- **TypeScript**: Tipagem estática para JavaScript

### 3. ORM e Banco de Dados

- **Prisma**: ORM moderno para Node.js e TypeScript
- **PostgreSQL**: Banco de dados relacional

### 4. Autenticação

- **Passport**: Middleware de autenticação para Node.js
- **JWT**: JSON Web Tokens para autenticação stateless
- **bcrypt**: Biblioteca para hashing de senhas

### 5. Validação

- **class-validator**: Validação baseada em decoradores
- **class-transformer**: Transformação de objetos

### 6. Documentação de API

- **Swagger/OpenAPI**: Documentação interativa da API
- **@nestjs/swagger**: Integração do Swagger com NestJS

### 7. Testes

- **Jest**: Framework de testes para JavaScript/TypeScript
- **Supertest**: Biblioteca para testes de HTTP

## Modelo de Dados

A aplicação utiliza um modelo de dados relacional com as seguintes entidades principais:

### User (Usuário)
- Tipos: Admin e Player (jogador)
- Posições para jogadores: Goleiro, Defensor, Meio-campo, Atacante

### Session (Sessão de Jogo)
- Status: Agendada, Completa, Cancelada
- Relacionada com times e jogadores

### Team (Time)
- Nome, cor da camisa
- Relacionado com sessões e jogadores

### PlayerSession (Relação Jogador-Sessão)
- Associa jogadores a sessões
- Armazena informações como time e presença

### GameResult (Resultado de Jogo)
- Armazena resultados de partidas
- Inclui pontuação e outros dados estatísticos

### PlayerFavorite (Jogadores Favoritos)
- Relacionamento many-to-many entre jogadores
- Permite que jogadores marquem outros como favoritos 