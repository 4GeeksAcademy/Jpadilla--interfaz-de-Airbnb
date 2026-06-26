'use client';

import { useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CategoryBar } from '@/components/CategoryBar';
import { PropertyCard } from '@/components/PropertyCard';
import { mockAlojamientos } from '@/types/mockData';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todo');

  const filteredAlojamientos = useMemo(() => {
    return mockAlojamientos.filter((item) => {
      const matchesSearch =
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === 'Todo' || item.categoria === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CategoryBar
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      <main className="max-w-[1400px] mx-auto px-4 py-6 md:px-8">
        <div className="mb-6">
          <p className="text-sm text-gray-500">Alojamientos destacados</p>
          <h1 className="text-2xl font-bold text-gray-900">
            {filteredAlojamientos.length} opciones para tu proxima estadia
          </h1>
        </div>

        {filteredAlojamientos.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-700 font-medium">
              No hay resultados con los filtros actuales.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Intenta con otra busqueda o cambia la categoria.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {filteredAlojamientos.map((item) => (
              <PropertyCard key={item.id} alojamiento={item} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
