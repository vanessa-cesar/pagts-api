// Modelo de item da lista de compras
class Item {
  constructor(id, produto, quantidade, prioridade) {
    this.id = id;
    this.produto = produto;
    this.quantidade = quantidade;
    this.prioridade = prioridade;
    this.comprado = false;
  }
}

module.exports = Item;
