const request = require('supertest');
const { expect } = require('chai'); 
const config = require('../../config.js');

const baseUrl = config.BaseURL;

describe('API de Lista de Compras', () => {
    let token;
    let itemId; 
   
    before(async function() {
    
        const credenciais = { 
            username: config.testUser, 
            password: config.testPassword 
        };

        const response = await request(baseUrl)
            .post('/users/login')
            .send(credenciais);
        
        expect(response.status).to.equal(200);
    
        token = response.body.token; 
        
        expect(token).to.not.be.undefined;
    });

    
   
    it('1 - Deve adicionar um novo item com nome único', async () => {
        const novoItem = { 
            produto: `Item_${Date.now()}`, 
            quantidade: 3,
            prioridade: 'Alta'             
        };
        
        const response = await request(baseUrl)
            .post('/lists/item')
            .set('Authorization', `Bearer ${token}`)
            .send(novoItem);
        
        
        expect(response.status, `Resposta inesperada ao criar item: ${JSON.stringify(response.body)}`).to.be.oneOf([200, 201]);

      
        expect(response.body, `Resposta inesperada ao criar item: ${JSON.stringify(response.body)}`).to.be.an('object');
        expect(response.body).to.have.property('quantidade');
        expect(response.body.quantidade).to.equal(novoItem.quantidade);
        expect(response.body).to.have.property('prioridade');
        expect(response.body.prioridade).to.equal(novoItem.prioridade);

        
        itemId = response.body.id || response.body._id || (response.body._doc && (response.body._doc.id || response.body._doc._id));
        expect(itemId, `ID do item não encontrado na resposta: ${JSON.stringify(response.body)}`).to.not.be.undefined;
    
    });

    it('2 - Deve marcar um item como comprado ', async () => {
        
        expect(itemId).to.not.be.undefined;

        const response = await request(baseUrl)
            .patch(`/lists/item/${itemId}/buy`) 
            .set('Authorization', `Bearer ${token}`);
       
        expect(response.status).to.equal(200);     
        expect(response.body).to.have.property('id', itemId);
        expect(response.body).to.have.property('comprado', true);
    });

  
    it('3 - Listar itens adicionados', async () => {
        const response = await request(baseUrl)
            .get('/lists')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
    });

   
    it('4 - Deve excluir o item da lista de compras', async () => {
       
        expect(itemId, 'ID do item não foi capturado no teste de POST').to.not.be.undefined;

        const response = await request(baseUrl)
            .delete(`/lists/item/${itemId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).to.be.oneOf([200, 204]); 
        
    });
});