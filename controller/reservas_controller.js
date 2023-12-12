const reservaService = require('../service/reservas_service');

async function listar(req, res) {
  try {
    const listaReservas = await reservaService.listar();
    res.json(listaReservas);
  } catch (err) {
    console.error('Erro ao listar reservas:', err);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

async function inserir(req, res) {
  let reserva = req.body;
  try {
    const reservaInserida = await reservaService.inserir(reserva);
    res.status(201).json(reservaInserida);
  } catch (err) {
    res.status(err.id || 500).json({ msg: err.message });
  }
}

async function buscarPorId(req, res) {
  const id = +req.params.id;
  try {
    const reserva = await reservaService.buscarPorId(id);
    res.json(reserva);
  } catch (err) {
    console.error('Erro ao buscar reserva por ID:', err);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

async function atualizar(req, res) {
  const id = +req.params.id;
  let reservaAtualizada = req.body;
  try {
    const reserva = await reservaService.atualizar(id, reservaAtualizada);
    res.json(reserva);
  } catch (err) {
    console.error('Erro ao atualizar reserva:', err);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

async function deletar(req, res) {
  const id = +req.params.id;
  try {
    const reservaDeletada = await reservaService.deletar(id);
    res.json(reservaDeletada);
  } catch (err) {
    console.error('Erro ao deletar reserva:', err);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar
};
