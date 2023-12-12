const express = require('express');
const router = express.Router();
const reservaController = require('../controller/reservas_controller');

router.get('/', reservaController.listar);
router.post('/', reservaController.inserir);
router.get('/:id', reservaController.buscarPorId);
router.put('/:id', reservaController.atualizar);
router.delete('/:id', reservaController.deletar);

module.exports = router;
