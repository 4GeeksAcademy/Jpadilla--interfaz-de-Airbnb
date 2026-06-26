'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { mockAlojamientos } from '@/types/mockData';
import { Alojamiento } from '@/types';

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export default function RoomDetailPage({ params }: RoomPageProps) {
  // Desenvuelve los parámetros dinámicos de forma segura (Next.js 15/16 + TypeScript)
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [alojamiento, setAlojamiento] = useState<Alojamiento | null>(null);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [currentFotoIndex, setCurrentFotoIndex] = useState(0);
  const [huespedes, setHuespedes] = useState(1);

  const isLoading = loadedId !== id;

  useEffect(() => {
    const timer = setTimeout(() => {
      const encontrado = mockAlojamientos.find((item) => item.id === id);
      setAlojamiento(encontrado || null);
      setLoadedId(id);
    }, 800); // Simulación de carga asíncrona obligatoria
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
        <p className="text-sm text-gray-500">Cargando detalles de la estancia...</p>
      </div>
    );
  }

  if (!alojamiento) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white p-4">
        <p className="text-gray-600 font-medium">No se encontró el alojamiento solicitado.</p>
        <Link href="/catalog" className="mt-4 text-rose-500 font-semibold underline">Regresar al catálogo</Link>
      </div>
    );
  }

  const siguienteFoto = () => {
    setCurrentFotoIndex((prev) => (prev + 1) % alojamiento.fotos.length);
  };

  const anteriorFoto = () => {
    setCurrentFotoIndex((prev) => (prev - 1 + alojamiento.fotos.length) % alojamiento.fotos.length);
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Botón superior de regreso SPA */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-rose-500 transition-colors">
          ⬅️ Volver al Catálogo
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-4 space-y-6">
        {/* Galería de fotos interactiva con botones */}
        <section className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <img
            src={alojamiento.fotos[currentFotoIndex]}
            alt={`Foto ${currentFotoIndex + 1}`}
            className="w-full h-full object-cover select-none"
          />
          {alojamiento.fotos.length > 1 && (
            <>
              <button onClick={anteriorFoto} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white text-gray-800 font-bold transition-all">
                ⟨
              </button>
              <button onClick={siguienteFoto} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white text-gray-800 font-bold transition-all">
                ⟩
              </button>
              <div className="absolute bottom-4 right-4 bg-gray-950/70 text-white text-xs px-3 py-1 rounded-md font-medium">
                {currentFotoIndex + 1} / {alojamiento.fotos.length}
              </div>
            </>
          )}
        </section>

        {/* Distribución de Información vs Reserva */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-950">{alojamiento.titulo}</h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 font-medium">
                <span>⭐ {alojamiento.valoracionEstrellas}</span>
                <span>•</span>
                <span className="underline">{alojamiento.numeroReseas} reseñas</span>
                <span>•</span>
                <span>{alojamiento.ubicacion}</span>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Fila del Anfitrión */}
            <div className="flex items-center gap-4">
              <img
                src={alojamiento.anfitrion.avatarUrl}
                alt={alojamiento.anfitrion.nombre}
                className="h-12 w-12 rounded-full object-cover bg-gray-200"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Anfitrión: {alojamiento.anfitrion.nombre}</h3>
                <p className="text-xs text-gray-500">{alojamiento.anfitrion.aniosComoAnfitrion} años ofreciendo experiencias</p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Acerca del lugar</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{alojamiento.descripcion}</p>
            </div>

            {/* Listado de Servicios */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Lo que este lugar ofrece</h3>
              <div className="grid grid-cols-2 gap-3">
                {alojamiento.amenities.map((am) => (
                  <div key={am.id} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 text-sm bg-gray-50 text-gray-800">
                    <span className="text-lg">{am.icono}</span>
                    <span className="font-medium">{am.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tarjeta de Reserva con control de rango mínimo (1) y máximo (6) */}
          <div className="h-fit border border-gray-200 rounded-2xl p-6 shadow-lg bg-white space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-gray-950">${alojamiento.precioPorNoche} USD</span>
              <span className="text-xs text-gray-500 font-medium">por noche</span>
            </div>

            <div className="border border-gray-300 rounded-xl p-3 space-y-1">
              <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider">Huéspedes</label>
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-medium text-gray-800">{huespedes} {huespedes === 1 ? 'viajero' : 'viajeros'}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setHuespedes((p) => Math.max(1, p - 1))}
                    disabled={huespedes <= 1}
                    className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:border-gray-950 hover:text-gray-950 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setHuespedes((p) => Math.min(6, p + 1))}
                    disabled={huespedes >= 6}
                    className="h-7 w-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:border-gray-950 hover:text-gray-950 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`¡Reserva solicitada para ${huespedes} huéspedes!`)}
              className="w-full bg-rose-500 text-white font-semibold py-3 rounded-xl hover:bg-rose-600 transition-colors shadow-sm text-sm"
            >
              Reservar ahora
            </button>
            <p className="text-[11px] text-center text-gray-400 font-medium">No se realizará ningún cargo todavía</p>
          </div>
        </div>
      </main>
    </div>
  );
}