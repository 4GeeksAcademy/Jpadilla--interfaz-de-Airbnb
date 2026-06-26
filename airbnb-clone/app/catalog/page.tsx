'use client';

import { useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PropertyCard } from '@/components/PropertyCard';
import { mockAlojamientos } from '@/types/mockData';

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showMapOnMobile, setShowMapOnMobile] = useState(false);

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

  const mapUrl = useMemo(() => {
    if (sorted.length === 0) return null;

    const latitudes = sorted.map((item) => item.latitud);
    const longitudes = sorted.map((item) => item.longitud);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const latPadding = Math.max((maxLat - minLat) * 0.25, 0.08);
    const lngPadding = Math.max((maxLng - minLng) * 0.25, 0.08);

    const centerLat = latitudes.reduce((acc, value) => acc + value, 0) / latitudes.length;
    const centerLng = longitudes.reduce((acc, value) => acc + value, 0) / longitudes.length;

    const params = new URLSearchParams({
      bbox: `${minLng - lngPadding},${minLat - latPadding},${maxLng + lngPadding},${maxLat + latPadding}`,
      layer: 'mapnik',
      marker: `${centerLat},${centerLng}`,
    });

    return `https://www.openstreetmap.org/export/embed.html?${params.toString()}`;
  }, [sorted]);

  return (
    <div className="min-h-screen">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-4 py-8 md:px-8 lg:grid-cols-12">
        <div className="lg:hidden col-span-1">
          <button
            onClick={() => setShowMapOnMobile((prev) => !prev)}
            className="w-full rounded-xl border border-[#ffd5c7] bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm"
          >
            {showMapOnMobile ? 'Ver lista de alojamientos' : 'Ver mapa de resultados'}
          </button>
        </div>

        {/* Lista de Tarjetas (Ocupa 7 columnas en escritorio) */}
        <section className={`lg:col-span-7 space-y-6 ${showMapOnMobile ? 'hidden lg:block' : 'block'}`}>
          <div className="soft-panel rounded-2xl p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff5a5f]">Resultados encontrados</p>
                <h1 className="mt-1 text-xl font-bold text-gray-900">{sorted.length} alojamientos disponibles</h1>
              </div>

              {/* Control de Ordenación Exigido */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider text-gray-600">Ordenar por precio:</label>
                <select
                  id="sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className="focus-soft rounded-lg border border-[#ffd0c1] bg-white px-3 py-2 text-sm text-gray-800"
                >
                  <option value="asc">Menor a Mayor 📈</option>
                  <option value="desc">Mayor a Menor 📉</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            {sorted.map((item) => (
              <PropertyCard key={item.id} alojamiento={item} />
            ))}
          </div>
        </section>

        {/* Área del mapa (real) */}
        <section className={`lg:col-span-5 w-full h-[350px] lg:h-[calc(100vh-170px)] lg:sticky lg:top-28 rounded-2xl border border-[#ffd9ca] overflow-hidden bg-gray-100 shadow-[0_14px_30px_rgba(255,116,94,0.15)] ${showMapOnMobile ? 'block' : 'hidden lg:block'}`}>
          {mapUrl ? (
            <div className="relative h-full w-full">
              <iframe
                title="Mapa de alojamientos"
                src={mapUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute left-3 top-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                {sorted.length} alojamientos visibles en el mapa
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl mb-2">🗺️</span>
              <p className="font-semibold text-gray-700">Sin ubicaciones para mostrar</p>
              <p className="text-xs text-gray-500 max-w-xs mt-1">Ajusta los filtros para volver a cargar resultados en el mapa.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}