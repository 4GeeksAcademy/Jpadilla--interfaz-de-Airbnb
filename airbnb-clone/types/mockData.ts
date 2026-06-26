import { Alojamiento } from './index';

export const mockAlojamientos: Alojamiento[] = [
  {
    id: '1',
    titulo: 'Apartamento de Lujo con Piscina',
    categoria: 'Alojamiento',
    placeholderFoto: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=500&q=80',
    fotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    precioPorNoche: 435,
    valoracionEstrellas: 4.94,
    numeroReseas: 128,
    ubicacion: 'Talamanca, Costa Rica',
    descripcion: 'Hermoso apartamento con acabados modernos, jardín de césped sintético y piscina privada impecable.',
    anfitrion: { nombre: 'Juan', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80', aniosComoAnfitrion: 3 },
    amenities: [{ id: '1', nombre: 'Piscina', icono: '🏊' }, { id: '2', nombre: 'Wifi', icono: '📶' }]
  },
  {
    id: '2',
    titulo: 'Cabaña Rústica de Montaña',
    categoria: 'Cabañas',
    placeholderFoto: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80',
    fotos: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
    ],
    precioPorNoche: 120,
    valoracionEstrellas: 4.85,
    numeroReseas: 42,
    ubicacion: 'Monteverde, Costa Rica',
    descripcion: 'Cabaña acogedora rodeada de bosque nuboso, perfecta para relajarse en pareja.',
    anfitrion: { nombre: 'María', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', aniosComoAnfitrion: 5 },
    amenities: [{ id: '2', nombre: 'Wifi', icono: '📶' }, { id: '3', font: 'Chimenea', icono: '🔥' }]
  }
];