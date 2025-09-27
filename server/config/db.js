const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Intentando conectar a MongoDB...'); 

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`FALLO LA CONEXIÓN A MONGODB: ${error.message}`); 
    throw error; // Lanza el error para que startServer() lo atrape
  }
};

module.exports = connectDB;