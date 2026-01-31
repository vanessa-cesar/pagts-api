const getAllLists = (req, res) => res.status(200).json([]);
const addItem = (req, res) => res.status(201).json({ id: 1, item: "Teste" });
const markAsBought = (req, res) => res.status(200).json({ bought: true });
const deleteItem = (req, res) => res.status(204).send();

module.exports = { getAllLists, addItem, markAsBought, deleteItem };