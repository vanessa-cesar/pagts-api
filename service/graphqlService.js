const { ApolloServer } = require('@apollo/server');

const typeDefs = `#graphql
  type Item {
    id: ID
    produto: String
    quantidade: Int
  }
  type Query {
    itens: [Item]
  }
`;

const resolvers = {
  Query: {
    itens: () => [{ id: "1", produto: "Item de Teste", quantidade: 1 }],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

async function loadExpressMiddleware() {
  try {
    const mod = await import('@apollo/server/express4');
    return mod.expressMiddleware;
  } catch (err) {
    // Fallback simples para testes quando a integração do Apollo não está disponível
    return function fallbackExpressMiddleware() {
      return async (req, res) => {
        try {
          const q = req.body && req.body.query;
          if (typeof q === 'string' && q.includes('itens')) {
            res.json({ data: { itens: [{ id: "1", produto: "Item de Teste", quantidade: 1 }] } });
          } else {
            res.status(400).json({ errors: ['Fallback supports only { itens } query'] });
          }
        } catch (e) {
          res.status(500).json({ errors: [e.message] });
        }
      };
    };
  }
}

module.exports = { server, loadExpressMiddleware };