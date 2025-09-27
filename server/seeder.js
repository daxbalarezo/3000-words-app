const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Word = require('./models/Word');

// Importamos tus archivos de datos
const { wordList } = require('./data/wordList');
const translations = require('./data/translations');

// =======================================================
// CORRECCIÓN:
// Al ejecutar "npm run seed" desde la raíz, dotenv encontrará
// el archivo .env automáticamente sin necesidad de una ruta.
// =======================================================
dotenv.config();

const importData = async () => {
  try {
    console.log(`✅ Archivos de datos cargados: ${wordList.length} palabras encontradas.`);

    await connectDB();
    console.log('Conectado a la base de datos...');

    await Word.deleteMany();
    console.log('Base de datos limpiada...');

    const wordsToInsert = wordList.map((wordObject) => {
      const wordKey = wordObject.word;
      const details = translations[wordKey] || { t: 'Sin traducción', e: 'Sin ejemplo' };
      return {
        word: wordKey,
        translation: details.t,
        example: details.e,
        status: 'pending'
      };
    });

    console.log('Procesamiento completo. Insertando datos...');
    await Word.insertMany(wordsToInsert);

    console.log('¡DATOS COMPLETOS IMPORTADOS CON ÉXITO! ✅');
    process.exit();
  } catch (error) {
    console.error(`\nError en el script seeder: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

importData();