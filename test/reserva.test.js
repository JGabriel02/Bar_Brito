const mesaService = require('../service/mesa_service');
const reservaService = require('../service/reservas_service');

// Testes para CRUD de Mesas
describe('Testes para o CRUD de Mesas', () => {
  let mesaIdCriada;

  test('Inserir mesa com sucesso', async () => {
    const novaMesa = { capacidade: 4 };
    const mesaInserida = await mesaService.inserir(novaMesa);
    mesaIdCriada = mesaInserida.id_mesa;

    expect(mesaInserida).toHaveProperty('id_mesa');
    expect(mesaInserida.capacidade).toBe(novaMesa.capacidade);
  });

  test('Listar mesas', async () => {
    const listaMesas = await mesaService.listar();
    expect(Array.isArray(listaMesas)).toBe(true);
  });

  test('Buscar mesa por ID', async () => {
    const mesaEncontrada = await mesaService.buscarPorId(mesaIdCriada);
    expect(mesaEncontrada.id_mesa).toBe(mesaIdCriada);
  });

  test('Atualizar mesa', async () => {
    const novaCapacidade = 6;
    const mesaAtualizada = await mesaService.atualizar(mesaIdCriada, { capacidade: novaCapacidade });
    expect(mesaAtualizada.capacidade).toBe(novaCapacidade);
  });

  test('Deletar mesa', async () => {
    const mesaDeletada = await mesaService.deletar(mesaIdCriada);
    expect(mesaDeletada.id_mesa).toBe(mesaIdCriada);

    // Verificar se a mesa foi deletada
    const mesaInexistente = await mesaService.buscarPorId(mesaIdCriada);
    expect(mesaInexistente).toBeNull();
  });
});

// Testes para CRUD de Reservas
describe('Testes para o CRUD de Reservas', () => {
  let reservaIdCriada;

  test('Inserir reserva com sucesso', async () => {
    const novaReserva = {
      nome_cliente: 'Maria',
      telefone: '987654321',
      id_mesa: 1 // Defina um ID válido de mesa existente
    };

    const reservaInserida = await reservaService.inserir(novaReserva);
    reservaIdCriada = reservaInserida.id_reserva;

    expect(reservaInserida).toHaveProperty('id_reserva');
    expect(reservaInserida.nome_cliente).toBe(novaReserva.nome_cliente);
  });

  test('Listar reservas', async () => {
    const listaReservas = await reservaService.listar();
    expect(Array.isArray(listaReservas)).toBe(true);
  });

  test('Buscar reserva por ID', async () => {
    const reservaEncontrada = await reservaService.buscarPorId(reservaIdCriada);
    expect(reservaEncontrada.id_reserva).toBe(reservaIdCriada);
  });

  test('Atualizar reserva', async () => {
    const novoTelefone = '999999999';
    const reservaAtualizada = await reservaService.atualizar(reservaIdCriada, { telefone: novoTelefone });
    expect(reservaAtualizada.telefone).toBe(novoTelefone);
  });

  test('Deletar reserva', async () => {
    const reservaDeletada = await reservaService.deletar(reservaIdCriada);
    expect(reservaDeletada.id_reserva).toBe(reservaIdCriada);

    // Verificar se a reserva foi deletada
    const reservaInexistente = await reservaService.buscarPorId(reservaIdCriada);
    expect(reservaInexistente).toBeNull();
  });
});
