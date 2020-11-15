const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/ClienteController')

router.post('/cadastrarCliente', ClienteController.cadastrarCliente)
router.get('/listarClientes', ClienteController.listarClientes)
router.get('/obterClientePorId/:id', ClienteController.obterClientePorId)
router.put('/editarCliente', ClienteController.editarCliente)
router.delete('/excluirCliente/:id', ClienteController.excluirCliente)

module.exports = router