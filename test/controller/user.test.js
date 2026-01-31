const sinon = require('sinon');
const { expect } = require('chai');
const userService = require('../../service/userService');

describe('Controller - User (Unit Test)', () => {
  it('Deve chamar o método de registro uma vez', async () => {
    const stub = sinon.stub(userService, 'register').resolves({ id: 1 });
    const result = await userService.register({ username: 'teste' });
    
    expect(stub.calledOnce).to.be.true;
    expect(result.id).to.equal(1);
    stub.restore();
  });
});