const mesaService = require('../service/mesa_service')


async function listar(req, res) {
    const listaMesas = await mesaService.listar();
    res.json(listaMesas);
}
async function inserir(req, res) {
  let mesa = req.body;
  try {
    const mesaInsert = await mesaService.inserir(mesa);
    res.status(201).json(mesaInsert);
  } catch (err) {
    // Caso err.id não seja um número inteiro válido, use 500 (Internal Server Error)
    res.status(err.id || 500).json({ msg: err.message });
  }
}


async function buscarPorId(req, res) {
  const id = +req.params.id;
  try {
    const mesa = await mesaService.buscarPorId(id);
    res.json(mesa);
  } catch (err) {
    console.error('Erro ao buscar mesa por ID:', err);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

async function atualizar(req, res) {
  const id = +req.params.id;
  let mesa = req.body;

  try {
    const mesasAtualizada = await mesaService.atualizar(id, mesa);
    res.json(mesasAtualizada);
  } catch (err) {
    console.error('Erro ao atualizar mesa:', err);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

async function deletar(req, res) {
  const id = +req.params.id;
  try {
    const mesaDeletada = await mesaService.deletar(id);
    res.json(mesaDeletada);
  } catch (err) {
    console.error('Erro ao deletar mesa:', err);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}