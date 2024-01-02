const express = require('express');
const processoController = require('../controllers/processoControllers');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', processoController.listarProcessos);
router.post('/', authenticateToken, processoController.criarProcesso);
router.get('/:id', authenticateToken, processoController.obterProcesso);
router.put('/:id', authenticateToken, processoController.atualizarProcesso);
router.delete('/:id', authenticateToken, processoController.excluirProcesso);

module.exports = router;
