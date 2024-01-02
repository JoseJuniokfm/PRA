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
