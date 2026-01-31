# Lista de Compras API

Este projeto consiste no desenvolvimento de uma API híbrida (REST e GraphQL) utilizando Node.js e Express, para autenticação de usuários e gerenciamento de listas de compras.

⚙️ Tecnologias e Ferramentas
Runtime: Node.js (v20+)

Framework Web: Express
Documentação: Swagger (OpenAPI 3.0)
API Query Language: GraphQL com Apollo Server
Testes: Mocha, Chai e Supertest
Mocks/Stubbing: Sinon.js
CI/CD: GitHub Actions

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```

## Execução

**Requisitos:** Node.js >= 20 e npm.

- Iniciar o servidor:
  ```
  npm start
  # ou
  node server.js
  ```

- Rodar a suíte de testes:
  ```
  npm test
  ```

## Documentação

Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## GraphQL

A API expõe um endpoint GraphQL em `/graphql`. Exemplo de requisição:

```bash
curl -X POST http://localhost:3000/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ itens { produto quantidade } }"}'
```

Note que em alguns cenários a integração do Apollo Server requer Node.js 20+ e uma configuração ESM adequada. Nos testes deste projeto, o endpoint é acionado via `app.setupGraphQL()` (veja `test/graphql/graphql.test.js`).

## Funcionalidades

- Cadastro de usuários
- Autenticação (login)
- Consulta de usuários
- Gerenciamento de lista de compras:
   - Inclusão de itens
   - Marcação de item como comprado
   - Listagem de itens
   - Exclusão de itens

## Autenticação

Após o login (`POST /users/login`), será retornado um token. Para acessar as rotas de lista de compras (`/lists`), envie o token no header:

```
Authorization: Bearer TOKEN_GERADO
```

## Estrutura

controller/   Camada responsável pelas rotas
service/      Camada de regras de negócio
model/        Modelos de dados
test/         Testes unitários, integração e GraphQL
app.js        Configuração da aplicação Express
server.js     Inicialização do servidor
swagger.json  Documentação da API REST


## Regras de Negócio

- Login exige usuário e senha
- Não permite usuários duplicados
- Rotas de lista exigem autenticação via token JWT
- Não permite incluir item já marcado como comprado
- Os dados são armazenados em memória (sem persistência)

## Testes

A suíte de testes cobre:
- **Testes Unitários:** Utilizando Sinon para isolamento de camadas.
- **Testes de Integração (REST):** Fluxos completos de autenticação e lista de compras.
- **Testes GraphQL:** Validação de queries e disponibilidade do endpoint.
Os testes são executados automaticamente durante o processo de integração contínua.


## Integração Contínua (CI)

Foi configurada uma pipeline de integração contínua utilizando GitHub Actions, 
responsável por:
Instalação das dependências
Configuração das variáveis de ambiente
Execução automática da suíte de testes


