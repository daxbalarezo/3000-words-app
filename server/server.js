const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

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
app.use(express.json());

// =======================================================
// 2. RUTAS DE LA API
// =======================================================
app.use('/api/words', wordRoutes);

// --------------------------------------------------------------------------
// 🚀 3. CONFIGURACIÓN DE PRODUCCIÓN PARA SERVIR EL FRONTEND (React)
// --------------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  
  const buildPath = path.join(__dirname, '..', 'client', 'dist');
  
  // 3a. Servir archivos estáticos
  app.use(express.static(buildPath));
  
  // 3b. ✅ CORRECCIÓN: Cambiar '*' por '/*'
  app.get('/*', (req, res) => {
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
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Fallo al conectar con la Base de Datos:', error);
    process.exit(1);
  }
};

startServer();