// Importation des composants utilisés sur la page d'accueil
import { Brands } from "../components/home/Brands"; // Section présentant les marques partenaires
import EmblaCarousel from "../components/home/Carousel"; // Carrousel d’images ou de produits
import Promo from "../components/home/Promo"; // Section pour les promotions ou offres spéciales
import ProductWidgetArea from "../components/home/ProductWidgetArea"; // Section affichant des produits mis en avant

// Composant principal de la page d'accueil
const Home = () => {
  return (
    // Container principal centré avec padding vertical
    <div className="container mx-auto py-12 text-center"> 
      
      {/* Carrousel d’images ou de produits en haut de la page */}
      <EmblaCarousel />

      {/* Section promotionnelle */}
      <Promo />

      {/* Présentation des marques partenaires */}
      <Brands />

      {/* Section affichant les produits mis en avant ou widgets produits */}
      <ProductWidgetArea />
    </div>
  );
};

// Export du composant pour l'utiliser dans l'application
export default Home;
