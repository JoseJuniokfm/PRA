/**
 * @swagger
 * tags:
 *   name: Reclamações
 *   description: Rotas relacionadas a reclamações
 */

/**
 * @swagger
 * /reclamacoes:
 *   get:
 *     summary: Lista todas as reclamações
 *     tags: [Reclamações]
 *     responses:
 *       200:
 *         description: Retorna a lista de todas as reclamações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reclamacao'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 */

/**
 * @swagger
 * /reclamacoes:
 *   post:
 *     summary: Cria uma nova reclamação
 *     tags: [Reclamações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReclamacaoInput'
 *     responses:
 *       201:
 *         description: Reclamação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reclamacao'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 */

/**
 * @swagger
 * /reclamacoes/{id}:
 *   get:
 *     summary: Obtém uma reclamação pelo ID
 *     tags: [Reclamações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da reclamação a ser obtida
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna os detalhes da reclamação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reclamacao'
 *       404:
 *         description: Reclamação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 */

/**
 * @swagger
 * /reclamacoes/{id}:
 *   put:
 *     summary: Atualiza uma reclamação pelo ID
 *     tags: [Reclamações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da reclamação a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReclamacaoInput'
 *     responses:
 *       200:
 *         description: Reclamação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reclamacao'
 *       404:
 *         description: Reclamação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 */

/**
 * @swagger
 * /reclamacoes/{id}:
 *   delete:
 *     summary: Exclui uma reclamação pelo ID
 *     tags: [Reclamações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da reclamação a ser excluída
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reclamação excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       404:
 *         description: Reclamação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 */

const Reclamacao = require('../models/reclamacaoModel');

async function listarReclamacoes(req, res) {
  try {
    const reclamacoes = await Reclamacao.findAll();
    res.json(reclamacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar reclamações' });
  }
}

async function criarReclamacao(req, res) {
  try {
    const { descricao, id_aluno, destino, status } = req.body;

    const novaReclamacao = await Reclamacao.create({
      descricao,
      id_aluno,
      destino,
      status,
    });

    res.status(201).json(novaReclamacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar reclamação' });
  }
}

async function obterReclamacao(req, res) {
  try {
    const { id } = req.params;
    const reclamacao = await Reclamacao.findByPk(id);

    if (!reclamacao) {
      return res.status(404).json({ error: 'Reclamação não encontrada' });
    }

    res.json(reclamacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter reclamação' });
  }
}

async function atualizarReclamacao(req, res) {
  try {
    const { id } = req.params;
    const { descricao, id_aluno, destino, status } = req.body;

    const reclamacao = await Reclamacao.findByPk(id);

    if (!reclamacao) {
      return res.status(404).json({ error: 'Reclamação não encontrada' });
    }

    reclamacao.descricao = descricao;
    reclamacao.id_aluno = id_aluno;
    reclamacao.destino = destino;
    reclamacao.status = status; 

    await reclamacao.save();

    res.json(reclamacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar reclamação' });
  }
}

async function excluirReclamacao(req, res) {
  try {
    const { id } = req.params;
    const reclamacao = await Reclamacao.findByPk(id);

    if (!reclamacao) {
      return res.status(404).json({ error: 'Reclamação não encontrada' });
    }

    await reclamacao.destroy();

    res.json({ message: 'Reclamação excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir reclamação' });
  }
}

module.exports = {
  listarReclamacoes,
  criarReclamacao,
  obterReclamacao,
  atualizarReclamacao,
  excluirReclamacao,
};
