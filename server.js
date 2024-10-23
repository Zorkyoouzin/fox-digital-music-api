const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
require('dotenv').config(); 

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando');
});

const musicRoutes = require('./routes/musicRoutes');
app.use('/api/music', musicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
