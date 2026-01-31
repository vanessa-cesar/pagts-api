const request = require('supertest');
const { expect } = require('chai'); 
const config = require('../../config.js');

const baseUrl = config.BaseURL;

describe('API de Lista de Compras', () => {
    let token;
    let itemId; 
   
    before(async function() {
        console.log('BASE_URL em uso:', baseUrl);
    
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
        produto: `Item_${Date.now()}`, // Usando 'produto' como no Swagger
        quantidade: 3,
        prioridade: 'Alta'             
    };
    
    const response = await request(baseUrl)
        .post('/lists/item')
        .set('Authorization', `Bearer ${token}`)
        .send(novoItem);
    
    // Debug para ver exatamente o que a API responde na Pipeline
    console.log('RESPOSTA API:', JSON.stringify(response.body, null, 2));
    
    expect(response.status).to.equal(201);
    
    // Ajuste aqui: troque qualquer 'item' por 'produto'
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('produto'); 
    expect(response.body).to.have.property('quantidade');

    itemId = response.body.id || response.body._id;
    expect(itemId).to.not.be.undefined;
    
});
    

    it('2 - Deve marcar um item como comprado ', async () => {
        
        expect(itemId).to.not.be.undefined;

        const response = await request(baseUrl)
            .patch(`/lists/item/${itemId}/buy`) 
            .set('Authorization', `Bearer ${token}`);
       
        expect(response.status).to.equal(200);     
        expect(response.body).to.have.property('id');
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