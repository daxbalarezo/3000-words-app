const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Intentando conectar a MongoDB...'); 

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`FALLO LA CONEXIÓN A MONGODB: ${error.message}`); 
    throw error;
  }
};

module.exports = connectDB;