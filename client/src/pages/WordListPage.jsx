import React, { useState, useEffect } from 'react';
import { fetchWords, updateWordStatus } from '../api/wordsApi';

const WordListPage = () => {
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const loadWords = async () => {
      setIsLoading(true);
      const data = await fetchWords(currentPage);
      if (data) {
        setWords(data.words);
        setTotalPages(data.totalPages);
        setTotalWords(data.totalWords);
      }
      setIsLoading(false);
    };

    loadWords();
  }, [currentPage, refreshTrigger]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateWordStatus(id, newStatus);
      setRefreshTrigger(prev => !prev); 
    } catch (error) {
      console.error("Falló la actualización del estado:", error);
      alert("Error: No se pudo actualizar la palabra.");
    }
  };
  
  if (isLoading) {
    return <div className="text-center p-10">Cargando lista de palabras...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Lista de Palabras</h1>
      <p className="text-center text-gray-600 mb-6">Total: {totalWords} palabras</p>
      
      {/* Vista de Tabla para Escritorio */}
      <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Palabra</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Traducción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ejemplo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {words.map((word) => (
              <tr key={word._id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{word.word}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{word.translation || '--'}</td>
                <td className="px-6 py-4 text-gray-500 text-sm italic">{word.example || '--'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${word.status === 'learned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {word.status === 'pending' ? 'Pendiente' : 'Aprendida'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {word.status === 'pending' ? (<button onClick={() => handleStatusChange(word._id, 'learned')} className="text-green-600 hover:text-green-900">Aprendida</button>) : (<button onClick={() => handleStatusChange(word._id, 'pending')} className="text-yellow-600 hover:text-yellow-900">Pendiente</button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de Tarjetas para Móvil */}
      <div className="md:hidden space-y-4">
        {words.map(word => (
          <div key={word._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">{word.word}</h2>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${word.status === 'learned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {word.status === 'pending' ? 'Pendiente' : 'Aprendida'}
              </span>
            </div>
            <p className="text-gray-700"><span className="font-semibold">Traducción:</span> {word.translation || '--'}</p>
            <p className="text-gray-500 text-sm italic mt-1"><span className="font-semibold not-italic text-gray-700">Ejemplo:</span> {word.example || '--'}</p>
            <div className="mt-4 border-t pt-2">
              <p className="text-sm font-medium text-gray-500 mb-1">Acciones:</p>
              {word.status === 'pending' ? (<button onClick={() => handleStatusChange(word._id, 'learned')} className="text-green-600 hover:text-green-900 font-semibold">Marcar como Aprendida</button>) : (<button onClick={() => handleStatusChange(word._id, 'pending')} className="text-yellow-600 hover:text-yellow-900 font-semibold">Marcar como Pendiente</button>)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Controles de Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50">Anterior</button>
        <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50">Siguiente</button>
      </div>
    </div>
  );
};

export default WordListPage;