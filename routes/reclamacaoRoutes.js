const express = require('express');
const reclamacaoController = require('../controllers/reclamacaoControllers');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', reclamacaoController.listarReclamacoes);
router.post('/', authenticateToken, reclamacaoController.criarReclamacao);
router.get('/:id', authenticateToken, reclamacaoController.obterReclamacao);
router.put('/:id', authenticateToken, reclamacaoController.atualizarReclamacao);
router.delete('/:id', authenticateToken, reclamacaoController.excluirReclamacao);

module.exports = router;
