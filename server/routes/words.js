const express = require('express');
const router = express.Router();
const { 
  getWords, 
  getPendingWords, 
  updateWordStatus,
  getLearnedCount  
} = require('../controllers/wordsController');
const Word = require('../models/Word');


// GET /api/words/pending - Obtener palabras pendientes
router.get('/pending', getPendingWords);

// GET /api/words/stats/learned - Obtener estadísticas de palabras aprendidas
router.get('/stats/learned', getLearnedCount);

// GET /api/words/details/:word - Obtener detalles específicos de una palabra
router.get('/details/:word', async (req, res) => {
  try {
    const { word } = req.params;
    const wordDetails = await Word.findOne({ word: word });
    if (wordDetails) {
      res.json({
        translation: wordDetails.translation,
        example_en: wordDetails.example,
        provider: 'Database'
      });
    } else {
      res.status(404).json({ message: 'Palabra no encontrada' });
    }
  } catch (error) {
    console.error('Error al obtener detalles de palabra:', error);
    res.status(500).json({ message: 'Error en el servidor al buscar detalles' });
  }
});

// GET /api/words - Obtener todas las palabras
router.get('/', getWords);


// PATCH /api/words/:id - Actualizar el estado de una palabra por ID
router.patch('/:id', updateWordStatus);

module.exports = router;