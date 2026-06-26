'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#ffd6c8] bg-[#fffdf8]/90 px-4 py-4 backdrop-blur md:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-4 md:flex-row">
        <Link href="/" className="leading-tight">
          <p className="font-display text-2xl tracking-tight text-[#1f2531]">airbnb</p>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a5f]">Costa Rica stays</p>
        </Link>

        <div className="soft-panel relative flex w-full max-w-xl items-center gap-2 rounded-full px-3 py-2 shadow-[0_8px_25px_rgba(255,90,95,0.08)]">
          <svg className="ml-2 h-4 w-4 text-[#9ca3af]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 21L16.65 16.65M10.5 18A7.5 7.5 0 1 0 10.5 3a7.5 7.5 0 0 0 0 15Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Explora destinos (ej: Talamanca)..."
            className="focus-soft w-full rounded-full border border-transparent bg-transparent px-3 py-2 text-sm text-gray-800 placeholder:text-gray-500"
          />
          <button className="rounded-full bg-[#ff5a5f] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#e23f45]">
            Buscar
          </button>
        </div>

        <nav className="flex items-center gap-4 text-sm font-semibold text-[#374151]">
          <Link href="/catalog" className="rounded-full border border-transparent px-3 py-2 transition-colors hover:border-[#ffd3bf] hover:bg-[#fff0e5] hover:text-[#ff5a5f]">Ir al Catálogo</Link>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffe2d4] font-bold text-[#7c3f31]">U</div>
        </nav>
      </div>
    </header>
  );
};