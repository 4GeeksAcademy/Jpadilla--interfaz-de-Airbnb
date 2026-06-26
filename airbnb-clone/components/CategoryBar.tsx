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
    <div className="w-full bg-white px-4 py-3 md:px-8 border-b border-gray-50 flex items-center gap-6 overflow-x-auto justify-start md:justify-center">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className={`flex flex-col items-center gap-1 pb-2 text-xs font-medium border-b-2 transition-all ${
              isActive ? 'border-gray-950 text-gray-950 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <span className="text-lg">{cat.icono}</span>
            <span>{cat.etiqueta}</span>
          </button>
        );
      })}
    </div>
  );
};