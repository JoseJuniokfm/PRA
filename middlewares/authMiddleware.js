const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed. Token not provided.' });
  }

  console.log('Token recebido:', token);

  jwt.verify(token, 'seu-segredo', (err, decoded) => {
    if (err) {
      console.error('Erro na verificação do token: ', err)
      return res.status(401).json({ error: 'Token inválido.' });
    }

    req.user = { matricula: decoded.matricula };
    next();
  });
};

module.exports = { authenticateToken };
