export interface Anfitrion {
  nombre: string;
  avatarUrl: string;
  aniosComoAnfitrion: number;
}

export interface Amenity {
  id: string;
  nombre: string;
  icono: string;
}

export interface Alojamiento {
  id: string;
  titulo: string;
  categoria: string;
  placeholderFoto: string;
  fotos: string[];
  precioPorNoche: number;
  valoracionEstrellas: number;
  numeroReseas: number;
  ubicacion: string;
  descripcion: string;
  anfitrion: Anfitrion;
  amenities: Amenity[];
}