// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import WordListPage from './pages/WordListPage';
import FlashcardsPage from './pages/FlashcardsPage';

function App() {
  const linkStyles = "px-4 py-2 rounded-md transition-colors text-lg";
  const activeLinkStyles = "bg-blue-500 text-white";
  const inactiveLinkStyles = "hover:bg-gray-200";

  return (
    <Router>
      <div className="min-h-screen">
        <nav className="bg-white shadow-md p-4 flex justify-center gap-6">
          <NavLink to="/" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
            Lista de Palabras
          </NavLink>
          <NavLink to="/flashcards" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
            Flashcards
          </NavLink>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<WordListPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;