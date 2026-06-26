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
      <div className="space-y-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
          <img
            src={alojamiento.placeholderFoto}
            alt={alojamiento.titulo}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button className="absolute top-3 right-3 text-white drop-shadow-md hover:scale-110 transition-transform">❤️</button>
        </div>
        <div className="flex flex-col text-sm">
          <div className="flex items-start justify-between font-medium text-gray-900">
            <h3 className="line-clamp-1">{alojamiento.titulo}</h3>
            <span className="shrink-0">⭐ {alojamiento.valoracionEstrellas}</span>
          </div>
          <p className="text-gray-500 line-clamp-1">{alojamiento.ubicacion}</p>
          <p className="mt-1 text-gray-950 font-semibold">
            ${alojamiento.precioPorNoche} USD <span className="text-gray-500 font-normal">noche</span>
          </p>
        </div>
      </div>
    </Link>
  );
};