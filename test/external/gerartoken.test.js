const request = require('supertest');
const { expect } = require('chai'); 
const config = require('../../config.js');

const baseUrl = config.BaseURL;

describe('Gerenciamento da Lista de Compras', () => {
    let token; 

 
    before(async () => {
        const credenciais = { 
            username: config.testUser, 
            password: config.testPassword 
        };

        const response = await request(baseUrl)
            .post('/users/login')
            .send(credenciais);
        
       
        expect(response.status).to.equal(200);
        
        token = response.body.token; 
    });

   
    it('Listar itens com sucesso usando o token no header', async () => {
        const response = await request(baseUrl)
            .get('/lists')
            .set('Authorization', `Bearer ${token}`); 

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('Deve impedir acesso à lista sem token (401)', async () => {
        const response = await request(baseUrl).get('/lists');
        expect(response.status).to.equal(401);
    });
});