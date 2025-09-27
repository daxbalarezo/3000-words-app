import React from 'react';

// Recibimos una nueva prop: onUpdateStatus
const WordCard = ({ word, onUpdateStatus }) => {

  // Función para la pronunciación
  const handlePronounce = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`p-5 rounded-lg shadow-md border transition-all duration-300 ${word.status === 'learned' ? 'bg-green-100 border-green-300' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold text-gray-800">{word.word}</h3>
        <button onClick={handlePronounce} title="Pronounce" className="text-xl text-gray-400 hover:text-blue-500 transition-colors">
          🔊
        </button>
      </div>
      <p className="text-lg text-gray-600 italic mb-3">{word.translation}</p>
      <p className="text-sm text-gray-500 mb-4">"{word.example}"</p>

      <div className="flex gap-2 text-sm">
        <button
          onClick={() => onUpdateStatus(word._id, 'learned')}
          className={`w-full py-1 rounded transition-colors ${word.status === 'learned' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-green-200'}`}
        >
          Learned
        </button>
        <button
          onClick={() => onUpdateStatus(word._id, 'pending')}
          className={`w-full py-1 rounded transition-colors ${word.status === 'pending' ? 'bg-yellow-400 text-white' : 'bg-gray-200 hover:bg-yellow-200'}`}
        >
          Pending
        </button>
      </div>
    </div>
  );
};

export default WordCard;