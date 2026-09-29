import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Componentes del proyecto
import PeriodicTable from './components/PeriodicTable';
import AtomosYEnlaces from './components/AtomosYEnlaces';
import EstadosYMezclas from './components/EstadosYMezclas';
import SimuladorPH from './components/SimuladorPH';
import SimuladorQuimica from './components/SimuladorQuimica'; // Componente 3D / R.A.

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        {/* Menú de Navegación */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-xl font-bold text-blue-400">Plataforma Química & 3D</h1>
            <nav className="flex flex-wrap gap-2">
              <Link to="/" className="px-3 py-2 rounded bg-gray-700 hover:bg-blue-600 transition">
                Tabla Periódica
              </Link>
              <Link to="/enlaces" className="px-3 py-2 rounded bg-gray-700 hover:bg-blue-600 transition">
                Átomos y Enlaces
              </Link>
              <Link to="/mezclas" className="px-3 py-2 rounded bg-gray-700 hover:bg-blue-600 transition">
                Estados y Mezclas
              </Link>
              <Link to="/ph" className="px-3 py-2 rounded bg-gray-700 hover:bg-blue-600 transition">
                Simulador pH
              </Link>
              <Link to="/simulador-3d" className="px-3 py-2 rounded bg-purple-700 hover:bg-purple-600 font-semibold transition">
                Laboratorio 3D
              </Link>
            </nav>
          </div>
        </header>

        {/* Rutas de las vistas */}
        <main className="flex-1 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<PeriodicTable />} />
            <Route path="/enlaces" element={<AtomosYEnlaces />} />
            <Route path="/mezclas" element={<EstadosYMezclas />} />
            <Route path="/ph" element={<SimuladorPH />} />
            <Route path="/simulador-3d" element={<SimuladorQuimica />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;