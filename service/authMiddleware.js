const authenticate = (req, res, next) => {
    // Simulação simples: se tiver qualquer coisa no header 'authorization', ele passa
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        return next();
    }
    return res.status(401).json({ message: "Não autorizado" });
};

module.exports = { authenticate };