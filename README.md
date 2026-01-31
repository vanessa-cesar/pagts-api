# Lista de Compras API

API REST em Node.js/Express para autenticação de usuários e gerenciamento de listas de compras.

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

- Registro e login de usuários
- Consulta de usuários
- Gerenciamento de listas de compras (adicionar, marcar como comprado, excluir)

## Autenticação

Após o login (`POST /users/login`), será retornado um token. Para acessar as rotas de lista de compras (`/lists`), envie o token no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

## Estrutura

- `controller/` - Lida com as rotas e requisições
- `service/` - Lógica de negócio
- `model/` - Modelos de dados
- `app.js` - Configuração do app Express
- `server.js` - Inicialização do servidor
- `swagger.json` - Documentação da API

## Regras de Negócio

- Login exige usuário e senha
- Não permite usuários duplicados
- Não permite incluir item já marcado como comprado

## Testes

A suíte de testes cobre:
- **Testes Unitários:** Utilizando Sinon para isolamento de camadas.
- **Testes de Integração (REST):** Fluxos completos de autenticação e lista de compras.
- **Testes GraphQL:** Validação de queries e disponibilidade do endpoint.
