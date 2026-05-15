const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
   // Refatorado para suportar o driver v4+ do MongoDB (opções obsoletas removidas)
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB conectado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;