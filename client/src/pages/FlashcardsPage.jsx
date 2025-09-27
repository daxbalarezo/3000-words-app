import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Usaremos axios directamente para simplificar

function FlashcardsPage() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [translation, setTranslation] = useState('');
  const [example, setExample] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect para cargar la lista de palabras pendientes
  useEffect(() => {
    const loadPendingWords = async () => {
      try {
        setIsLoading(true);
        // Llamamos a la nueva ruta /pending
        const response = await axios.get('/api/words/pending');
        // Barajamos las palabras para que no salgan siempre en el mismo orden
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

  // useEffect para buscar la traducción (este no cambia)
  useEffect(() => {
    const currentWordObject = words[currentIndex];
    if (currentWordObject) {
      // Ya tenemos los datos, no necesitamos buscar
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
    return <div className="text-center p-10">¡Felicidades, no tienes palabras pendientes!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[80vh]">
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
      <button onClick={handleNext} className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-md">
        Siguiente
      </button>
    </div>
  );
}

export default FlashcardsPage;