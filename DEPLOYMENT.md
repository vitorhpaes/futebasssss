# Guia de Implantação em Produção

Este guia descreve os passos necessários para preparar o sistema Futebass IA para produção, com foco especial na configuração do pacote de constantes compartilhado.

## Estrutura do Projeto

O projeto Futebass IA é um monorepo baseado em Yarn Workspaces, com os seguintes pacotes:

- `front`: Aplicação front-end em React
- `server`: Aplicação back-end em NestJS
- `constants`: Pacote de constantes compartilhadas

## Preparando para Produção

### 1. Construção do Pacote de Constantes

O pacote de constantes precisa ser compilado antes de qualquer outro pacote, pois ambos o front-end e o back-end dependem dele.

```bash
# Na raiz do projeto
cd constants
yarn build
```

### 2. Instalação de Dependências

É importante garantir que as dependências entre os pacotes estejam corretamente configuradas:

```bash
# Na raiz do projeto
yarn install
```

### 3. Construção do Front-end

O front-end depende do pacote de constantes, portanto, deve ser construído após o pacote de constantes:

```bash
# Na raiz do projeto
cd front
yarn build
```

### 4. Construção do Back-end

O back-end também depende do pacote de constantes:

```bash
# Na raiz do projeto
cd server
yarn build
```

### 5. Configuração de CI/CD

Se você estiver usando um pipeline de CI/CD, é importante garantir que os passos sejam executados na ordem correta:

```yaml
# Exemplo de configuração para GitHub Actions
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'yarn'
      
      # Instalar dependências
      - name: Install dependencies
        run: yarn install
      
      # Construir o pacote de constantes primeiro
      - name: Build constants package
        run: cd constants && yarn build
      
      # Construir o front-end
      - name: Build frontend
        run: cd front && yarn build
        
      # Construir o back-end
      - name: Build backend
        run: cd server && yarn build
```

### 6. Implantação em Ambientes de Produção

#### Opção 1: Deploy como Monorepo

Você pode implantar o projeto como um monorepo completo, mantendo a estrutura atual. Esta é a abordagem mais simples, mas pode não ser a mais eficiente para ambientes de produção.

#### Opção 2: Deploy como Aplicações Separadas

Alternativamente, você pode implantar o front-end e o back-end como aplicações separadas, garantindo que o pacote de constantes seja incluído em ambos.

Para o front-end:
```bash
# Incluir o pacote de constantes compilado no build do front-end
cp -r constants/dist front/node_modules/@futebasssss-ia/constants
```

Para o back-end:
```bash
# Incluir o pacote de constantes compilado no build do back-end
cp -r constants/dist server/node_modules/@futebasssss-ia/constants
```

#### Opção 3: Publicar o Pacote de Constantes como um Pacote NPM

Para uma solução mais robusta, você pode publicar o pacote de constantes em um registro NPM privado (como GitHub Packages, NPM Private Registry ou seu próprio Verdaccio).

1. Configure o `package.json` do pacote de constantes:
```json
{
  "name": "@futebasssss-ia/constants",
  "version": "1.0.0",
  "private": true,
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

2. Publique o pacote:
```bash
cd constants
npm publish
```

3. Configure o front-end e o back-end para usar o pacote publicado.

### 7. Considerações para Atualizações

Quando você atualizar o pacote de constantes:

1. Faça as alterações necessárias nos arquivos de enumeradores
2. Atualize a versão no `package.json` do pacote de constantes
3. Reconstrua o pacote com `yarn build`
4. Se estiver usando a abordagem de publicação, publique a nova versão
5. Atualize as referências no front-end e no back-end, se necessário
6. Reconstrua o front-end e o back-end

## Solução de Problemas

### Erros de TypeScript

Se você encontrar erros de TypeScript relacionados ao pacote de constantes:

1. Verifique se o pacote de constantes foi compilado com sucesso
2. Verifique se as dependências entre os pacotes estão corretamente configuradas
3. Tente remover e reinstalar o node_modules:
   ```bash
   rm -rf node_modules
   yarn install
   ```
4. Reconstrua o pacote de constantes:
   ```bash
   cd constants
   yarn build
   ```

### Erros de Importação em Tempo de Execução

Se você encontrar erros de importação em tempo de execução:

1. Verifique se o pacote de constantes está sendo incluído corretamente no build final
2. Se estiver usando uma abordagem de deploy separado, verifique se o pacote de constantes está disponível para ambas as aplicações 