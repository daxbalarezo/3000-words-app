const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// =======================================================
// CORRECCIÓN: Cargar las variables de entorno PRIMERO
// =======================================================
dotenv.config();

// Ahora que las variables están cargadas, importamos el resto de archivos
const connectDB = require('./config/db');
const wordRoutes = require('./routes/words');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/words', wordRoutes);

const PORT = process.env.PORT || 5000;

// Función para iniciar el servidor
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Fallo al conectar con la Base de Datos:', error);
    process.exit(1);
  }
};

// Llamar a la función para arrancar todo
startServer();