const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');
const { jwtSecret } = require('../config/config');

async function login(req, res) {
  try {
    const { matricula, senha } = req.body;

    const usuario = await Usuario.findOne({
      where: { matricula },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);


    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, 'seu-segredo', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

async function register(req, res) {
  try {
    const { matricula, nome, senha, tipo } = req.body;

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar um novo usuário no banco de dados
    const novoUsuario = await Usuario.create({
      matricula,
      nome,
      senha: hashedPassword,
      tipo,
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso', novoUsuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

module.exports = { register, login };
