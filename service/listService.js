const Item = require('../model/item'); // Importe o seu modelo

let items = []; // Simulando um banco de dados simples

const getAllLists = (req, res) => res.status(200).json(items);

const addItem = (req, res) => {
    const { produto, quantidade, prioridade } = req.body;
    const novoItem = new Item(items.length + 1, produto, quantidade, prioridade);
    items.push(novoItem);
    res.status(201).json(novoItem);
};

const markAsBought = (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === parseInt(id));
    if (item) {
        item.comprado = true;
        return res.status(200).json(item);
    }
    res.status(404).json({ message: "Item não encontrado" });
};

const deleteItem = (req, res) => {
    const { id } = req.params;
    items = items.filter(i => i.id !== parseInt(id));
    res.status(204).send();
};

module.exports = { getAllLists, addItem, markAsBought, deleteItem };