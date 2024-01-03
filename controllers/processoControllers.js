/**
 * @swagger
 * tags:
 *   name: Processos
 *   description: Rotas relacionadas a processos
 */

/**
 * @swagger
 * /processos:
 *   get:
 *     summary: Lista todos os processos
 *     tags: [Processos]
 *     responses:
 *       200:
 *         description: Retorna a lista de todos os processos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Processo'
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
 * /processos:
 *   post:
 *     summary: Cria um novo processo
 *     tags: [Processos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProcessoInput'
 *     responses:
 *       201:
 *         description: Processo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
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
 * /processos/{id}:
 *   get:
 *     summary: Obtém um processo pelo ID
 *     tags: [Processos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do processo a ser obtido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna os detalhes do processo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
 *       404:
 *         description: Processo não encontrado
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
 * /processos/{id}:
 *   put:
 *     summary: Atualiza um processo pelo ID
 *     tags: [Processos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do processo a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProcessoInput'
 *     responses:
 *       200:
 *         description: Processo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Processo'
 *       404:
 *         description: Processo não encontrado
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
 * /processos/{id}:
 *   delete:
 *     summary: Exclui um processo pelo ID
 *     tags: [Processos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do processo a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Processo excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       404:
 *         description: Processo não encontrado
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

const Processo = require('../models/processoModel');

async function listarProcessos(req, res) {
    try {
      const processos = await Processo.findAll();
      res.json(processos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar processos' });
    }
}

async function criarProcesso(req, res) {
  try {
    const { data_inicial, data_final, dados_denunciante, descricao, reclamacao_id } = req.body;

    const novoProcesso = await Processo.create({
      data_inicial,
      data_final,
      dados_denunciante,
      descricao,
      reclamacao_id
    });

    res.status(201).json(novoProcesso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar processo' });
  }
}

async function obterProcesso(req, res) {
    try {
      const { id } = req.params;
      const processo = await Processo.findOne({
        where: { id },
      });
  
      if (!processo) {
        return res.status(404).json({ error: 'Processo não encontrado' });
      }
  
      res.json(processo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter processo' });
    }
}

async function atualizarProcesso(req, res) {
  try {
    const { id } = req.params;
    console.log('ID:', id);
    console.log('Dados Denunciante:', dados_denunciante);

    const { data_inicial, data_final, dados_denunciante, descricao, reclamacao_id } = req.body;

    const processo = await Processo.findOne({
      where: { id },
    });

    if (!processo) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }

    processo.data_inicial = data_inicial;
    processo.data_final = data_final;
    processo.descricao = descricao;
    processo.reclamacao_id = reclamacao_id;

    await processo.save();

    res.json(processo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar processo' });
  }
}

async function excluirProcesso(req, res) {
    try {
      const { id } = req.params;
      const processo = await Processo.findOne({
        where: { id },
      });
  
      if (!processo) {
        return res.status(404).json({ error: 'Processo não encontrado' });
      }
  
      await processo.destroy();
  
      res.json({ message: 'Processo excluído com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir processo' });
    }
}
  
module.exports = {
    listarProcessos,
    criarProcesso,
    obterProcesso,
    atualizarProcesso,
    excluirProcesso,
};
