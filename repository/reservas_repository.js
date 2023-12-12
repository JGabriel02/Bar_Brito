const { Client } = require('pg');

const conexao = {
  host: 'localhost',
  port: 5432,
  database: 'Brito',
  user: 'postgres',
  password: '123456'
};

async function listarReservas() {
  const client = new Client(conexao);
  try {
    await client.connect();
    const result = await client.query('SELECT * from reservas');
    const listaReservas = result.rows;
    return listaReservas;
  } catch (error) {
    console.error('Erro ao listar reservas:', error);
    throw error;
  } finally {
    await client.end();
  }
}

async function inserirReserva(reserva) {
  const client = new Client(conexao);
  try {
    await client.connect();
    const result = await client.query(
      'INSERT INTO reservas(nome_cliente, telefone, id_mesa) VALUES ($1, $2, $3) RETURNING *',
      [reserva.nome_cliente, reserva.telefone, reserva.id_mesa]
    );
    const reservaInserida = result.rows[0];
    return reservaInserida;
  } catch (error) {
    console.error('Erro ao inserir reserva:', error);
    throw error;
  } finally {
    await client.end();
  }
}

async function buscarReservaPorId(id_reserva) {
  const cliente = new Client(conexao);
  try {
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM reservas WHERE id_reserva=$1', [id_reserva]);
    const reserva = res.rows[0];
    return reserva;
  } catch (error) {
    console.error('Erro ao buscar reserva por ID:', error);
    throw error;
  } finally {
    await cliente.end();
  }
}

async function atualizarReserva(id_reserva, reserva) {
  const sql = 'UPDATE reservas SET nome_cliente=$1, telefone=$2, id_mesa=$3 WHERE id_reserva=$4 RETURNING *';
  const values = [reserva.nome_cliente, reserva.telefone, reserva.id_mesa, id_reserva];

  const cliente = new Client(conexao);
  try {
    await cliente.connect();
    const res = await cliente.query(sql, values);
    const reservaAtualizada = res.rows[0];
    return reservaAtualizada;
  } catch (error) {
    console.error('Erro ao atualizar reserva:', error);
    throw error;
  } finally {
    await cliente.end();
  }
}

async function deletarReserva(id_reserva) {
  const sql = 'DELETE FROM reservas WHERE id_reserva=$1 RETURNING *';
  const values = [id_reserva];

  const cliente = new Client(conexao);
  try {
    await cliente.connect();
    const res = await cliente.query(sql, values);
    const reservaDeletada = res.rows[0];
    return reservaDeletada;
  } catch (error) {
    console.error('Erro ao deletar reserva:', error);
    throw error;
  } finally {
    await cliente.end();
  }
}


// ... (outras importações e configurações necessárias)

// Função para verificar se a mesa está disponível
async function verificarDisponibilidadeMesa(id_mesa) {
    const client = new Client(conexao);
    try {
      await client.connect();
      const res = await client.query('SELECT COUNT(*) AS total_reservas FROM reservas WHERE id_mesa=$1', [id_mesa]);
      const { total_reservas } = res.rows[0];
      return parseInt(total_reservas) === 0;
    } catch (error) {
      console.error('Erro ao verificar disponibilidade da mesa:', error);
      throw error;
    } finally {
      await client.end();
    }
  }
  
  // Função para liberar a mesa
  async function liberarMesa(id_mesa) {
    const client = new Client(conexao);
    try {
      await client.connect();
      await client.query('UPDATE mesas SET disponivel=true WHERE id_mesa=$1', [id_mesa]);
    } catch (error) {
      console.error('Erro ao liberar mesa:', error);
      throw error;
    } finally {
      await client.end();
    }
  }
  

  
  module.exports = {
    listarReservas,
    inserirReserva,
    buscarReservaPorId,
    atualizarReserva,
    deletarReserva,
    verificarDisponibilidadeMesa, 
    liberarMesa,

  };
  

