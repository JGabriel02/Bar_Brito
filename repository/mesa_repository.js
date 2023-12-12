const {Client} = require('pg');

const conexao = {
    host: "localhost",
    port: 5432,
    database: "Brito",
    user: "postgres",
    password: "123456"
}

async function listarMesas(){
  const cliente = new Client(conexao);
  try {
    await cliente.connect();
    const result = await cliente.query('SELECT * FROM mesas WHERE disponivel = true');
    const listaMesasDisponiveis = result.rows;
    return listaMesasDisponiveis;
  } catch (error) {
    console.error('Erro ao listar mesas disponíveis:', error);
    throw error;
  } finally {
    await cliente.end();
  }
}

async function inserirMesas(mesas) {
  const client = new Client(conexao);
  
  try {
    await client.connect();
    const result = await client.query(
      'INSERT INTO mesas(capacidade, disponivel) VALUES ($1, $2) RETURNING *',
      [mesas.capacidade, true] // Atribuindo um valor padrão para a coluna disponivel, por exemplo, 'true'
    );
    const mesaInserida = result.rows[0];
    return mesaInserida;
  } catch (error) {
    console.error('Erro ao inserir mesa:', error);
    throw error;
  } finally {
    await client.end();
  }
}
  

  async function buscarPorId(id_mesa) {
    const cliente = new Client(conexao);
    try {
      await cliente.connect();
      const res = await cliente.query('SELECT * FROM mesas WHERE id_mesa=$1', [id_mesa]);
      const mesa = res.rows[0];
      return mesa;
    } catch (error) {
      console.error('Erro ao buscar mesa por ID:', error);
      throw error;
    } finally {
      await cliente.end();
    }
  }
  
  async function atualizarMesas(id_mesa, mesa) {
    const sql = 'UPDATE mesas SET capacidade=$1 WHERE id_mesa=$2 RETURNING *';
    const values = [mesa.capacidade, id_mesa];
  
    const cliente = new Client(conexao);
    try {
      await cliente.connect();
      const res = await cliente.query(sql, values);
      const mesaAtualizada = res.rows[0];
      return mesaAtualizada;
    } catch (error) {
      console.error('Erro ao atualizar mesa:', error);
      throw error;
    } finally {
      await cliente.end();
    }
  }
  
  async function deletarMesas(id) {
    const sql = 'DELETE FROM mesas WHERE id=$1 RETURNING *';
    const values = [id];
  
    const cliente = new Client(conexao);
    try {
      await cliente.connect();
      const res = await cliente.query(sql, values);
      const mesaDeletada = res.rows[0];
      return mesaDeletada;
    } catch (error) {
      console.error('Erro ao deletar mesa:', error);
      throw error;
    } finally {
      await cliente.end();
    }
  }

  async function atualizarDisponibilidadeMesa(id_mesa, disponibilidade) {
    const cliente = new Client(conexao);
    try {
      await cliente.connect();
      const sql = 'UPDATE mesas SET disponivel = $1 WHERE id_mesa = $2';
      const values = [disponibilidade, id_mesa];
      await cliente.query(sql, values);
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade da mesa:', error);
      throw error;
    } finally {
      await cliente.end();
    }
  }
module.exports = {
    listarMesas,
    inserirMesas,
    buscarPorId,
    atualizarMesas,
    deletarMesas,
    atualizarDisponibilidadeMesa
}