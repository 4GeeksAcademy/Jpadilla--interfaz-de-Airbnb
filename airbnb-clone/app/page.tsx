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
    <div className="min-h-screen">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CategoryBar
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />

      <main className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
        <section className="soft-panel mb-8 overflow-hidden rounded-3xl p-6 md:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ff5a5f]">Escapadas curadas</p>
          <h1 className="font-display text-3xl leading-tight text-[#1f2531] md:text-5xl">
            Encuentra tu próxima estancia con vista inolvidable
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[#4b5563] md:text-base">
            Explora alojamientos únicos en Costa Rica, filtrados por estilo y listos para reservar en pocos pasos.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-[#374151] shadow-sm">
            <span className="font-semibold text-[#1f2937]">{filteredAlojamientos.length}</span>
            <span>opciones para tu próxima estadía</span>
          </div>
        </section>

        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">Alojamientos destacados</p>
            <h2 className="text-2xl font-bold text-gray-900">Seleccionados para ti</h2>
          </div>
        </div>

        {filteredAlojamientos.length === 0 ? (
          <div className="rounded-2xl border border-[#ffd9ca] bg-white p-8 text-center shadow-sm">
            <p className="font-medium text-gray-700">
              No hay resultados con los filtros actuales.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Intenta con otra busqueda o cambia la categoria.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredAlojamientos.map((item) => (
              <PropertyCard key={item.id} alojamiento={item} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
