const express = require('express')
const router = express.Router()
const mesaController = require('../controller/mesas_controller')


router.get('/', mesaController.listar);
router.post('/', mesaController.inserir);
router.get('/:id', mesaController.buscarPorId);
router.put('/:id', mesaController.atualizar);
router.delete('/:id', mesaController.deletar);

module.exports = router;