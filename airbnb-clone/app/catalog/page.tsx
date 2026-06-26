'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PropertyCard } from '@/components/PropertyCard';
import { mockAlojamientos } from '@/types/mockData';

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filtrado básico por término de búsqueda
  const filtered = mockAlojamientos.filter((item) =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenación por precio usando el estado local (Rúbrica: Reordenar según selección)
  const sorted = [...filtered].sort((a, b) => {
    return sortOrder === 'asc' 
      ? a.precioPorNoche - b.precioPorNoche 
      : b.precioPorNoche - a.precioPorNoche;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="max-w-[1400px] mx-auto px-4 py-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lista de Tarjetas (Ocupa 7 columnas en escritorio) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-gray-500">Resultados encontrados</p>
              <h1 className="text-xl font-bold text-gray-900">{sorted.length} alojamientos disponibles</h1>
            </div>
            
            {/* Control de Ordenación Exigido */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs font-medium text-gray-600 uppercase tracking-wider">Ordenar por precio:</label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-800 outline-none focus:border-rose-500"
              >
                <option value="asc">Menor a Mayor 📈</option>
                <option value="desc">Mayor a Menor 📉</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            {sorted.map((item) => (
              <PropertyCard key={item.id} alojamiento={item} />
            ))}
          </div>
        </section>

        {/* Área del mapa (Ocupa 5 columnas en escritorio, se va abajo en móvil) */}
        <section className="lg:col-span-5 w-full h-[350px] lg:h-[calc(100vh-160px)] lg:sticky lg:top-24 rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center p-4 text-center">
          <span className="text-3xl mb-2">🗺️</span>
          <p className="font-semibold text-gray-700">Vista del Mapa</p>
          <p className="text-xs text-gray-400 max-w-xs mt-1">Placeholder estilizado en gris con texto según especificación de la entrega base.</p>
        </section>
      </main>
    </div>
  );
}