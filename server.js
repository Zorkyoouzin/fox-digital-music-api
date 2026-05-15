const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
require('dotenv').config(); 

const app = express();

// Middleware de CORS para permitir que o Angular (porta 4200) acesse esta API (porta 5000)
app.use(cors());

// Conecta ao Banco de Dados (Docker/MongoDB)
connectDB();

// Permite que a API entenda requisições com corpo em JSON
app.use(express.json());

// Middlewares de Header para evitar cache indesejado nas respostas
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Rota Principal (Health Check) - Padrão Pleno de retorno JSON
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Music API funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Importação das rotas de música
const musicRoutes = require('./routes/musicRoutes');

// Definição do prefixo da rota
app.use('/api/music', musicRoutes);

// Configuração da porta
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Endpoint principal: http://localhost:${PORT}/api/music`);
});