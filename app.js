const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userController = require('./controller/userController');
const listController = require('./controller/listController');
const { authenticate } = require('./service/authMiddleware');

const { server, loadExpressMiddleware } = require('./service/graphqlService');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', userController);
app.use('/lists', authenticate, listController);

app.setupGraphQL = async () => {
    try {
        await server.start();
        const expressMiddleware = await loadExpressMiddleware();
        app.use('/graphql', expressMiddleware(server));
        console.log('✅ GraphQL configurado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao iniciar Apollo Server:', error);
    }
};

module.exports = app;