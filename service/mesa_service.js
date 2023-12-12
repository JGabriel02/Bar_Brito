const mesaRepository = require('../repository/mesa_repository');

async function listar() {
  return await mesaRepository.listarMesas();
}


async function inserir(mesa) {
  if (mesa && mesa.capacidade) {
    const mesaParaInserir = {
      capacidade: mesa.capacidade,
      disponivel: true 
    };
    return await mesaRepository.inserirMesas(mesaParaInserir);
  } else {
    throw { id: 400, message: "Por favor, informe a capacidade" };
  }
}


async function buscarPorId(id) {
  const mesa = await mesaRepository.buscarPorId(id);
  if (mesa) {
    return mesa;
  } else {
    throw { id: 404, message: "Mesa não encontrada" };
  }
}

async function atualizar(id, mesasAtualizadas) {
  const mesaExistente = await mesaRepository.buscarPorId(id);

  if (!mesaExistente) {
    throw { id: 404, message: "Mesa não encontrada" };
  }

  if (mesasAtualizadas && mesasAtualizadas.capacidade) {
    return await mesaRepository.atualizarMesas(id, mesasAtualizadas);
  } else {
    throw { id: 400, message: "Por favor, informe a capacidade" };
  }
}

async function deletar(id) {
  const mesaDeletada = await mesaRepository.deletarMesas(id);
  if (mesaDeletada) {
    return mesaDeletada;
  } else {
    throw { id: 404, message: "Mesa não encontrada" };
  }
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar
};
