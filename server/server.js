const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // ⬅️ NUEVO: Necesario para manejar rutas de archivos

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

// Rutas de la API
app.use('/api/words', wordRoutes);

// --------------------------------------------------------------------------
// 🚀 LÓGICA DE PRODUCCIÓN PARA SERVIR EL FRONTEND (React)
// --------------------------------------------------------------------------

// Revisa si la aplicación está corriendo en un entorno de producción (ej. Railway)
if (process.env.NODE_ENV === 'production') {
  
  // Define la ruta absoluta a la carpeta de build del cliente (client/dist)
  // path.join(__dirname, '..', 'client', 'dist')
  // __dirname: /server
  // ..: /
  // client/dist: /client/dist
  const buildPath = path.join(__dirname, '..', 'client', 'dist');
  
  // 1. Servir los archivos estáticos (CSS, JS, imágenes)
  app.use(express.static(buildPath));
  
  // 2. Para cualquier solicitud GET que NO sea una ruta de API definida arriba, 
  // enviar el archivo index.html (la aplicación React).
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
  });
}

// --------------------------------------------------------------------------

const PORT = process.env.PORT || 5000;

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // 1. Conectar a la base de datos
    await connectDB();
    
    // 2. Iniciar el servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Fallo al conectar con la Base de Datos:', error);
    // Si la conexión falla, detenemos el proceso
    process.exit(1);
  }
};

// Llamar a la función para arrancar todo
startServer();
