const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
require('dotenv').config(); 

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.get('/', (req, res) => {
  res.send('API funcionando');
});

const musicRoutes = require('./routes/musicRoutes');
app.use('/api/music', musicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
