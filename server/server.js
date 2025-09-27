const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Importar el módulo 'path' para manejar directorios

// =======================================================
// 1. CARGA DE CONFIGURACIÓN
// =======================================================
dotenv.config();

// Importar módulos internos
const connectDB = require('./config/db');
const wordRoutes = require('./routes/words');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite a Express leer cuerpos JSON

// =======================================================
// 2. RUTAS DE LA API
// =======================================================
app.use('/api/words', wordRoutes);

// --------------------------------------------------------------------------
// 🚀 3. CONFIGURACIÓN DE PRODUCCIÓN PARA SERVIR EL FRONTEND (React)
// ESTE BLOQUE RESUELVE EL ERROR "Cannot GET /"
// --------------------------------------------------------------------------

// Revisa si la aplicación está corriendo en un entorno de producción (ej. Railway)
if (process.env.NODE_ENV === 'production') {
  
  // Define la ruta absoluta a la carpeta de build del cliente (client/dist).
  // Se usa '..' para subir un nivel desde 'server' a la raíz del proyecto.
  const buildPath = path.join(__dirname, '..', 'client', 'dist');
  
  // 3a. Servir los archivos estáticos (CSS, JS, imágenes) desde la carpeta de build
  app.use(express.static(buildPath));
  
  // 3b. Para cualquier otra solicitud GET que no sea una ruta de API definida arriba, 
  // enviar el archivo index.html (el punto de entrada de la aplicación React).
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
  });
}

// --------------------------------------------------------------------------

const PORT = process.env.PORT || 5000;

// =======================================================
// 4. INICIO DEL SERVIDOR
// =======================================================
const startServer = async () => {
  try {
    // 1. Conectar a la base de datos
    await connectDB();
    
    // 2. Iniciar el servidor Express
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Fallo al conectar con la Base de Datos:', error);
    // Si la conexión falla, detenemos el proceso inmediatamente
    process.exit(1);
  }
};

// Llamar a la función para arrancar todo
startServer();
