const app = require('./app');

const PORT = process.env.PORT || 3000;

async function start() {
  
    await app.setupGraphQL();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
    });
}

start().catch(err => console.error(err));