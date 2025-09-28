const Word = require('../models/Word');

const getWords = async (req, res) => {
  try {
    const limit = 20;
    const page = parseInt(req.query.page) || 1;
    const totalWords = await Word.countDocuments();
    const totalPages = Math.ceil(totalWords / limit);

    const words = await Word.find({})
      .sort({ word: 1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({
      words,
      page,
      totalPages,
      totalWords
    });
  } catch (error) {
    console.error('Error al obtener las palabras paginadas:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getPendingWords = async (req, res) => {
  try {
    const words = await Word.find({ status: 'pending' });
    res.json(words);
  } catch (error) {
    console.error('Error al obtener las palabras pendientes:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const updateWordStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const word = await Word.findById(req.params.id);

    if (word) {
      word.status = status;
      const updatedWord = await word.save();
      res.json(updatedWord);
    } else {
      res.status(404).json({ message: 'Palabra no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la palabra:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Agregar esta función al final del archivo, antes del module.exports

const getLearnedCount = async (req, res) => {
  try {
    const learnedCount = await Word.countDocuments({ status: 'learned' });
    const totalCount = await Word.countDocuments();
    
    res.json({
      learned: learnedCount,
      total: totalCount,
      pending: totalCount - learnedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWords,
  getPendingWords,
  updateWordStatus,
  getLearnedCount,
};