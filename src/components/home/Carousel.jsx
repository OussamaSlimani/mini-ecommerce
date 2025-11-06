// Importation du hook principal de la bibliothèque Embla Carousel
import useEmblaCarousel from 'embla-carousel-react';

// Importation des icônes de navigation (flèches gauche/droite)
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Tableau des diapositives (slides) à afficher dans le carrousel
const slides = [
  { src: '/src/assets/img/carousel/h4-slide.png',  alt: 'Slide 1' },
  { src: '/src/assets/img/carousel/h4-slide2.png', alt: 'Slide 2' },
  { src: '/src/assets/img/carousel/h4-slide3.png', alt: 'Slide 3' },
  { src: '/src/assets/img/carousel/h4-slide4.png', alt: 'Slide 4' },
  { src: '/src/assets/img/carousel/h4-slide5.png', alt: 'Slide 5' },
];

// Définition du composant EmblaCarousel
const EmblaCarousel = () => {
  // Initialisation du carrousel avec le hook Embla
  // emblaRef : référence à l'élément DOM qui contient les slides
  // emblaApi : API permettant de contrôler le carrousel (scroll, etc.)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,              // Fait boucler le carrousel (retour au début après la fin)
    align: 'center',         // Centre les slides dans la vue
    containScroll: 'trimSnaps', // Évite les débordements de défilement
  });

  // Fonctions de navigation manuelle (gauche et droite)
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    // Conteneur principal du carrousel
    <div className="relative max-w-7xl mx-auto my-8 overflow-hidden rounded-xl">

      {/* Conteneur Embla : zone scrollable contenant les slides */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {/* Affichage dynamique de chaque image de slide */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-none w-full h-64 sm:h-80 md:h-96 lg:h-[500px] relative"
            >
              <img
                src={slide.src}           // Chemin de l'image
                alt={slide.alt}           // Texte alternatif pour l'accessibilité
                className="w-full h-full object-cover" // Image adaptative couvrant tout l’espace
                loading="lazy"            // Chargement différé pour de meilleures performances
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- Bouton de navigation gauche --- */}
      <button
        onClick={scrollPrev} // Défilement vers la diapositive précédente
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* --- Bouton de navigation droite --- */}
      <button
        onClick={scrollNext} // Défilement vers la diapositive suivante
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* --- Indicateurs de pagination (petits points en bas du carrousel) --- */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)} // Navigation directe vers une slide spécifique
            className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-all"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Exportation du composant pour l’utiliser dans d’autres pages
export default EmblaCarousel;
