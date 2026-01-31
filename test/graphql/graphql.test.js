const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app'); 

describe('API - Teste GraphQL', () => {

  it('Listar itens via query GraphQL', async () => {
   
    await app.setupGraphQL(); 

    const response = await request(app)
      .post('/graphql')
      .send({
        query: "{ itens { produto quantidade } }"
      });

    expect(response.status).to.equal(200);
    expect(response.body.data).to.have.property('itens');
  });
});