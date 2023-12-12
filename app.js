const express = require('express');
const bodyParser = require('body-parser');
const mesas = require('./router/mesa_router');
const reservas = require('./router/reservas_router')


const app = express();
const PORTA = 3000;

app.use(bodyParser.json());  //Configura o middleware para analisar corpos das requisições no formato JSON

app.use('/mesas', mesas); // Define o caminho base para as rotas de mesas
app.use('/reservas', reservas); // Define o caminho base para as rotas de reserva



app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
