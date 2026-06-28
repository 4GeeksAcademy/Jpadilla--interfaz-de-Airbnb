# Contexto del Proyecto: Clon de Arquitectura Frontend (Airbnb)

## 1. El Usuario y sus Objetivos
El usuario de la plataforma es un viajero (huésped) que busca alojamiento vacacional. Su flujo de comportamiento se divide en tres intenciones claras:
*   **Descubrir:** Inspirarse en la página de inicio mediante categorías visuales.
*   **Comparar:** Filtrar y evaluar opciones disponibles en una lista de resultados de búsqueda (Catálogo).
*   **Decidir:** Revisar los detalles específicos, fotos, precio y servicios de un alojamiento para proceder a reservar (Detalle).

---

## 2. Descripción de las Vistas e Interfaz

### A. Página de Inicio (Home)
Diseñada bajo un enfoque *mobile-first*, prioriza el acceso rápido a la barra de búsqueda y la navegación por categorías de alojamiento.
*   **Componentes Principales:**
    *   `SearchHeader`: Barra superior flotante optimizada para toques táctiles.
    *   `CategoryCarousel`: Desplazador horizontal de iconos (Playas, Cabañas, Modernas).
    *   `ListingGrid`: Cuadrícula adaptativa que muestra tarjetas de propiedades destacadas.
    *   `MobileNavigation`: Barra fija inferior (Bottom Nav) con accesos a Explorar, Favoritos e Iniciar Sesión.

### B. Página de Catálogo (Resultados de Búsqueda)
Presenta de forma clara los alojamientos que coinciden con los criterios del usuario, balanceando la información del precio y la ubicación.
*   **Componentes Principales:**
    *   `FilterBar`: Botones superiores para segmentar por precio, tipo de lugar o servicios.
    *   `HorizontalListingCard`: En móviles, tarjetas verticales compactas; en escritorio, cambia a diseño horizontal para mostrar descripción breve al lado de la imagen.
    *   `MapToggle`: Botón flotante para alternar entre vista de lista y vista de mapa (simulado).

### C. Vista de Detalle de la Habitación
Página enfocada en la conversión (reserva) y en desglosar de forma transparente toda la información de una propiedad específica.
*   **Componentes Principales:**
    *   `ImageGallery`: Un carrusel deslizable en móviles; se transforma en una cuadrícula de 5 imágenes (diseño collage) en pantallas de escritorio.
    *   `HostProfile`: Sección con la información del anfitrión y reglas de la casa.
    *   `BookingWidget`: Caja flotante inferior en móvil (o tarjeta fija a la derecha en escritorio) que desglosa el precio por noche, limpieza y el botón de llamada a la acción ("Reservar").

---

## 3. Estrategia de Conexión y Navegación
*   **Navegación SPA (Single Page Application):** Se utilizará el componente `<Link>` de Next.js para asegurar que las transiciones entre el Home, Catálogo y Detalle ocurran de forma instantánea y sin recargar el navegador, manteniendo un estado fluido.
*   **Responsividad:** Todos los componentes usarán utilidades de Tailwind CSS partiendo de la base móvil (375px) e incrementando su complejidad en pantallas grandes usando modificadores como `md:` y `lg:` (768px en adelante).
