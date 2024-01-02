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
        where: { id, dados_denunciante },
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
