'use client';

import React from 'react';
import Link from 'next/link';
import { Alojamiento } from '@/types';

interface PropertyCardProps {
  alojamiento: Alojamiento;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ alojamiento }) => {
  return (
    <Link href={`/rooms/${alojamiento.id}`} className="group block cursor-pointer">
      <article className="space-y-3 rounded-2xl border border-[#ffe5db] bg-white/85 p-3 shadow-[0_12px_26px_rgba(255,121,92,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(255,101,89,0.2)]">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
          <img
            src={alojamiento.placeholderFoto}
            alt={alojamiento.titulo}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
          <button className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-[#e2555e] shadow-sm transition-transform hover:scale-105">❤</button>
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#263040]">
            ⭐ {alojamiento.valoracionEstrellas}
          </span>
        </div>
        <div className="flex flex-col text-sm">
          <div className="flex items-start justify-between font-medium text-gray-900">
            <h3 className="line-clamp-1">{alojamiento.titulo}</h3>
            <span className="shrink-0 rounded-md bg-[#fff3ea] px-2 py-0.5 text-xs text-[#6b7280]">Top</span>
          </div>
          <p className="line-clamp-1 text-gray-500">{alojamiento.ubicacion}</p>
          <p className="mt-1 text-base font-semibold text-gray-950">
            ${alojamiento.precioPorNoche} USD <span className="text-sm font-normal text-gray-500">noche</span>
          </p>
        </div>
      </article>
    </Link>
  );
};