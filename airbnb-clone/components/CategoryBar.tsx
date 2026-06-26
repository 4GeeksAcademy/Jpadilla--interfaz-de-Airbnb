'use client';

import React from 'react';

interface CategoryBarProps {
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

const CATEGORIES = [
  { id: 'Todo', etiqueta: 'Todo', icono: '✨' },
  { id: 'Alojamiento', etiqueta: 'Playa', icono: '🏖️' },
  { id: 'Cabañas', etiqueta: 'Cabañas', icono: '🏡' }
];

export const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, onCategorySelect }) => {
  return (
    <div className="w-full px-4 py-4 md:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 overflow-x-auto rounded-2xl border border-[#ffe1d5] bg-white/75 p-2 shadow-[0_10px_24px_rgba(255,148,110,0.12)]">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              isActive
                ? 'bg-[#ff5a5f] text-white shadow-[0_8px_20px_rgba(255,90,95,0.35)]'
                : 'bg-white text-gray-600 hover:bg-[#fff2e9] hover:text-[#303642]'
            }`}
          >
            <span className="text-base">{cat.icono}</span>
            <span>{cat.etiqueta}</span>
          </button>
        );
      })}
      </div>
    </div>
  );
};