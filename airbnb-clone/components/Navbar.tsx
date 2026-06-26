'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white px-4 py-3 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link href="/" className="text-rose-500 font-bold text-xl tracking-tight">
        airbnb
      </Link>

      <div className="relative w-full max-w-md border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow py-2 px-4 bg-white flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Explora destinos (ej: Talamanca)..."
          className="w-full text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none pr-8"
        />
        <span className="absolute right-3 text-gray-400 text-sm">🔍</span>
      </div>

      <nav className="flex items-center gap-4 text-sm font-medium text-gray-700">
        <Link href="/catalog" className="hover:text-rose-500 transition-colors">Ir al Catálogo</Link>
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">U</div>
      </nav>
    </header>
  );
};