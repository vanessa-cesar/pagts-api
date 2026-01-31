const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    // Lógica de registro
    res.status(201).json({ message: "Usuário registrado com sucesso." });
};

const login = async (req, res) => {
    // Lógica que estava no seu gerartoken
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.status(200).json({ token });
};

const getAll = async (req, res) => {
    res.status(200).json([]);
};

module.exports = { register, login, getAll };