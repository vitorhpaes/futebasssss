# Documentação do Projeto Front-end

Este documento descreve os padrões, estruturas e tecnologias utilizadas no front-end do projeto Futebass-IA.

## Estrutura de Camadas

### 1. Componentes (`/src/components`)

A camada de componentes está estruturada nas seguintes subcategorias:

- **UI (`/components/ui`)**: Componentes básicos de interface que seguem a filosofia de Design System, utilizando principalmente Radix UI como base e styled-components para estilização. Exemplos incluem:
  - Toast: sistema de notificações
  - Alert: componente para exibição de alertas

- **Layout (`/components/layout`)**: Componentes responsáveis pela estruturação do layout da aplicação, incluindo:
  - AuthenticatedLayout: layout utilizado nas páginas que requerem autenticação

- **Form (`/components/form`)**: Componentes relacionados a formulários, utilizando Formik e Zod para validação.

- **Navigation (`/components/navigation`)**: Componentes de navegação como menus e barras de navegação.

- **Cards (`/components/cards`)**: Componentes de cartões para exibição de informações.

- **Auth (`/components/auth`)**: Componentes específicos para autenticação.

### 2. Páginas (`/src/pages`)

As páginas são organizadas por funcionalidade e por tipo de usuário:

- **Admin (`/pages/admin`)**: Páginas acessíveis apenas para administradores
  - DashboardPage: página principal do admin
  - PlayerListPage: página de listagem de jogadores
  - PlayerCreatePage: página de criação de jogadores
  - PlayerEditPage: página de edição de jogadores
  - MatchListPage: página de listagem de partidas
  - MatchCreatePage: página de criação de partidas

- **Auth (`/pages/auth`)**: Páginas relacionadas à autenticação
  - LoginPage: página de login para jogadores
  - AdminLoginPage: página de login específica para administradores

- **Player (`/pages/player`)**: Páginas acessíveis apenas para jogadores
  - DashboardPage: página principal do jogador

### 3. Rotas (`/src/routes`)

O gerenciamento de rotas é feito utilizando React Router DOM v7, com os seguintes componentes:

- **AppRoutes**: Configuração principal de todas as rotas da aplicação, organizadas por tipo de usuário.
- **ProtectedRoute**: Componente HOC (Higher-Order Component) que verifica se o usuário está autenticado e tem permissão para acessar determinada rota.

### 4. Serviços (`/src/services`)

A camada de serviços gerencia as chamadas à API e a lógica de negócios relacionada:

- **api.ts**: Configuração central do Axios, incluindo interceptors para tratamento de tokens e erros.
- **Serviços específicos** organizados por entidade:
  - `/services/auth`: Serviços relacionados à autenticação
  - `/services/users`: Serviços relacionados a usuários
  - `/services/players`: Serviços relacionados a jogadores
  - `/services/teams`: Serviços relacionados a times
  - `/services/matches`: Serviços relacionados a partidas

Cada serviço possui:
- **interfaces.ts**: Definição de tipos e validação de schemas com Zod
- **queries.ts**: Hooks do React Query para operações de consulta e mutação

### 5. Contexto e Estado (`/src/context`)

Gerenciamento de estado global utilizando Zustand:

- **authStore.ts**: Estado global relacionado à autenticação, incluindo informações do usuário e token.

### 6. Tema (`/src/theme`)

Sistema de tema e estilos globais da aplicação:

- **theme.ts**: Definição de variáveis de tema como cores, espaçamento, etc.
- **ThemeProvider.tsx**: Provedor de tema que permite alternância entre temas claro e escuro.
- **GlobalStyles.ts**: Estilos globais da aplicação.
- **ResponsiveUtils.tsx**: Utilitários para design responsivo.

### 7. Utilitários (`/src/utils`)

Funções auxiliares e lógica reutilizável.

## Tecnologias e Ferramentas

### 1. Base e Build

- **React 19**: Framework JavaScript para construção de interfaces
- **TypeScript**: Superset de JavaScript com tipagem estática
- **Vite**: Ferramenta de build e desenvolvimento

### 2. Roteamento

- **React Router DOM v7**: Biblioteca para gerenciamento de rotas

### 3. Estilização

- **Styled Components**: CSS-in-JS para estilização de componentes
- **Radix UI**: Biblioteca de componentes primitivos acessíveis e customizáveis
- **React Icons**: Biblioteca de ícones

### 4. Gerenciamento de Estado

- **Zustand**: Biblioteca leve para gerenciamento de estado global
- **React Query (TanStack Query)**: Biblioteca para gerenciamento de estado do servidor, caching e sincronização

### 5. Formulários e Validação

- **Formik**: Biblioteca para gerenciamento de formulários
- **Zod**: Biblioteca para validação de schemas e tipagem
- **zod-formik-adapter**: Integração entre Zod e Formik

### 6. HTTP e API

- **Axios**: Biblioteca para requisições HTTP

### 7. Utilidades

- **dayjs**: Biblioteca leve para manipulação de datas

## Padrões de Código

### 1. React Query

- Definição de query keys por entidade (ENTITY_QUERY_KEYS)
- Hooks customizados para queries (useEntity) e mutations (useEntityMutation)
- Invalidação automática de queries após mutações

### 2. Componentes

- Interfaces bem definidas com TypeScript
- Uso de componentes funcionais com hooks
- Estilização com styled-components

### 3. Autenticação

- Token JWT armazenado em estado global com persistência
- Interceptor do Axios para incluir token automaticamente
- Redirecionamento automático para login quando o token expira

### 4. Validação

- Schemas definidos com Zod para validação de dados
- Integração com Formik para validação de formulários

### 5. Rotas

- Proteção de rotas baseada em roles (admin/player)
- Layout autenticado compartilhado entre rotas protegidas
- Redirecionamento baseado em role após login 