const reservaRepository = require('../repository/reservas_repository');
const mesaRepository = require('../repository/mesa_repository');


async function listar() {
  return await reservaRepository.listarReservas();
}

async function inserir(reserva) {
  if (reserva && reserva.nome_cliente && reserva.telefone && reserva.id_mesa) {
    const mesaDisponivel = await reservaRepository.verificarDisponibilidadeMesa(reserva.id_mesa);
    if (!mesaDisponivel) {
      throw { id: 409, message: "Esta mesa já está reservada" };
    }

    const reservaInserida = await reservaRepository.inserirReserva(reserva);

    // Atualizar o status de disponibilidade da mesa para false após a reserva bem-sucedida
    await mesaRepository.atualizarDisponibilidadeMesa(reserva.id_mesa, false);

    return reservaInserida;
  } else {
    throw { id: 400, message: "Por favor, informe os dados corretamente para criar a reserva" };
  }
}

async function listarMesasDisponiveis() {
  return await mesaRepository.listarMesasDisponiveis();
}

async function buscarPorId(id) {
  const reserva = await reservaRepository.buscarReservaPorId(id);
  if (reserva) {
    return reserva;
  } else {
    throw { id: 404, message: "Reserva não encontrada" };
  }
}

async function atualizar(id, reservaAtualizada) {
  const reservaExistente = await reservaRepository.buscarReservaPorId(id);

  if (!reservaExistente) {
    throw { id: 404, message: "Reserva não encontrada" };
  }

  if (
    reservaAtualizada &&
    (reservaAtualizada.nome_cliente || reservaAtualizada.telefone || reservaAtualizada.id_mesa)
  ) {
    return await reservaRepository.atualizarReserva(id, reservaAtualizada);
  } else {
    throw { id: 400, message: "Por favor, informe os dados corretamente para atualizar a reserva" };
  }
}

async function deletar(id) {
  const reservaDeletada = await reservaRepository.deletarReserva(id);
  if (reservaDeletada) {
    await reservaRepository.liberarMesa(reservaDeletada.id_mesa);
    return reservaDeletada;
  } else {
    throw { id: 404, message: "Reserva não encontrada" };
  }
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
  listarMesasDisponiveis
};
