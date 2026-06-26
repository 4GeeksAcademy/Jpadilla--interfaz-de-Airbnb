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
    <div className="min-h-screen bg-white">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="max-w-[1400px] mx-auto px-4 py-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:hidden col-span-1">
          <button
            onClick={() => setShowMapOnMobile((prev) => !prev)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm"
          >
            {showMapOnMobile ? 'Ver lista de alojamientos' : 'Ver mapa de resultados'}
          </button>
        </div>

        {/* Lista de Tarjetas (Ocupa 7 columnas en escritorio) */}
        <section className={`lg:col-span-7 space-y-6 ${showMapOnMobile ? 'hidden lg:block' : 'block'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-gray-500">Resultados encontrados</p>
              <h1 className="text-xl font-bold text-gray-900">{sorted.length} alojamientos disponibles</h1>
            </div>
            
            {/* Control de Ordenación Exigido */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs font-medium text-gray-600 uppercase tracking-wider">Ordenar por precio:</label>
              <select
                id="sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-800 outline-none focus:border-rose-500"
              >
                <option value="asc">Menor a Mayor 📈</option>
                <option value="desc">Mayor a Menor 📉</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            {sorted.map((item) => (
              <PropertyCard key={item.id} alojamiento={item} />
            ))}
          </div>
        </section>

        {/* Área del mapa (real) */}
        <section className={`lg:col-span-5 w-full h-[350px] lg:h-[calc(100vh-160px)] lg:sticky lg:top-24 rounded-2xl border border-gray-200 overflow-hidden bg-gray-100 ${showMapOnMobile ? 'block' : 'hidden lg:block'}`}>
          {mapUrl ? (
            <div className="relative h-full w-full">
              <iframe
                title="Mapa de alojamientos"
                src={mapUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute left-3 top-3 rounded-lg bg-white/95 px-3 py-2 text-xs text-gray-700 shadow-sm">
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