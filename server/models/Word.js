// /server/models/Word.js
const mongoose = require('mongoose');
const wordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true, trim: true },
  translation: { type: String }, // Ya no es requerido
  example: { type: String },     // Ya no es requerido
  status: { type: String, enum: ['pending', 'learned'], default: 'pending' },
});
const Word = mongoose.model('Word', wordSchema);
module.exports = Word;