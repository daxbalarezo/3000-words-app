const express = require('express');
const router = express.Router();
const { getWords, getPendingWords, updateWordStatus } = require('../controllers/wordsController');

router.route('/pending').get(getPendingWords);
router.route('/').get(getWords);
router.route('/:id').patch(updateWordStatus);

// Mantenemos la ruta de 'details' que ya no usa la IA
const Word = require('../models/Word');
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
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;