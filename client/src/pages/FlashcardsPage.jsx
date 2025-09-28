import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLearnedStats } from '../api/wordsApi';

function FlashcardsPage() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [translation, setTranslation] = useState('');
  const [example, setExample] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ learned: 0, total: 0, pending: 0 });

  // Detectar entorno automáticamente
  const isDevelopment = import.meta.env.MODE === 'development';
  const API_BASE = isDevelopment ? 'http://localhost:5000' : '';

  // EFFECT PARA CARGAR ESTADÍSTICAS
  useEffect(() => {
    const loadStats = async () => {
      const statsData = await getLearnedStats();
      setStats(statsData);
    };
    loadStats();
  }, []);

  // useEffect para cargar la lista de palabras pendientes
  useEffect(() => {
    const loadPendingWords = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE}/api/words/pending`);
        const shuffledWords = response.data.sort(() => Math.random() - 0.5);
        setWords(shuffledWords);
      } catch (err) {
        console.error("Error cargando palabras pendientes:", err);
        setError("No se pudieron cargar las palabras.");
      } finally {
        setIsLoading(false);
      }
    };
    loadPendingWords();
  }, []);

  // useEffect para buscar la traducción
  useEffect(() => {
    const currentWordObject = words[currentIndex];
    if (currentWordObject) {
      setTranslation(currentWordObject.translation);
      setExample(currentWordObject.example);
    }
  }, [currentIndex, words]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % words.length);
    }, 300);
  };

  const currentWord = words[currentIndex]?.word || 'Cargando...';

  // Si está cargando la lista inicial
  if (isLoading && words.length === 0) {
    return <div className="text-center p-10">Cargando flashcards...</div>;
  }
  
  // Si no hay palabras pendientes
  if (words.length === 0) {
    return (
      <div className="text-center p-10">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-green-800 mb-2">¡Felicidades!</h2>
          <p className="text-green-700">No tienes palabras pendientes</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{stats.learned}</div>
              <div className="text-sm text-green-600">Aprendidas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-yellow-600">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-600">Total</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[80vh]">
      {/* CONTADOR DE PROGRESO */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Tu Progreso</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{stats.learned}</div>
              <div className="text-xs text-gray-600">Aprendidas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-xs text-gray-600">Pendientes</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="w-96 h-60 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Cara Frontal */}
          <div className="absolute w-full h-full backface-hidden bg-white shadow-xl rounded-lg flex items-center justify-center text-5xl font-bold p-4">
            {currentWord}
          </div>
          {/* Cara Trasera */}
          <div className="absolute w-full h-full backface-hidden bg-blue-100 shadow-xl rounded-lg flex flex-col items-center justify-center p-6 text-center transform rotate-y-180">
            <>
              <p className="text-3xl font-semibold text-blue-800">{translation}</p>
              <p className="text-md text-gray-700 mt-4 italic">"{example}"</p>
            </>
          </div>
        </div>
      </div>
      
      {/* Contador de palabras en el mazo */}
      <div className="mt-4 text-gray-600">
        Palabra {currentIndex + 1} de {words.length} en este mazo
      </div>
      
      <button onClick={handleNext} className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-md">
        Siguiente
      </button>
    </div>
  );
}

export default FlashcardsPage;