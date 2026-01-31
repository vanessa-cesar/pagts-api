const request = require('supertest');
const { expect } = require('chai'); 
const config = require('../../config.js');

const baseUrl = config.BaseURL;

describe('Fluxo de Autenticação - Registro e Login', () => {
   
    it('Registrar um novo usuário com sucesso', async () => {
        const novoUsuario = {
            username: `User_${Date.now()}`, 
            password: config.testPassword,
        };

        const response = await request(baseUrl)
            .post('/users/register')
            .send(novoUsuario);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message', 'Usuário registrado com sucesso.');
    });

    
    it('Realizar login e retornar o token JWT', async () => {
        const credenciais = { 
            username: config.testUser, 
            password: config.testPassword 
        };

        const response = await request(baseUrl)
            .post('/users/login')
            .send(credenciais);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
    });
});