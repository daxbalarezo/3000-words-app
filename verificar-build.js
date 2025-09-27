// verificar-build.js
const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'client', 'dist');

if (!fs.existsSync(buildPath)) {
  console.error('❌ ERROR: La carpeta client/dist no existe después del build');
  console.log('📁 Directorio actual:', __dirname);
  console.log('🔍 Contenido del directorio:', fs.readdirSync(__dirname));
  process.exit(1);
}

console.log('✅ Build verificado correctamente');