// --- Importations nécessaires ---
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Pour la navigation et la gestion de l’URL
import { ShoppingCart } from 'lucide-react'; // Icône du panier
import { useCart } from '../hooks/useCart'; // Hook personnalisé pour accéder au panier
import Navbar from './Navbar'; // Composant de navigation principal
import { useState } from 'react'; // Gestion d’état local avec React
import logo from '../assets/img/logo.png'; // Logo du site

// --- Composant principal : Header ---
// Il affiche le logo, la barre de recherche, le panier et la navigation.
const Header = () => {
  // Récupération du panier et de son état de chargement via le hook personnalisé
  const { cart, isLoading } = useCart();

  // Récupère la route actuelle pour déterminer si la barre de recherche doit être masquée
  const location = useLocation();

  // Hook pour naviguer vers une nouvelle page (ex: après une recherche)
  const navigate = useNavigate();

  // État local pour stocker la valeur du champ de recherche
  const [searchTerm, setSearchTerm] = useState('');

  // --- Fonction de gestion de la recherche ---
  const handleSearch = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const query = searchTerm.trim(); // Supprime les espaces inutiles

    if (query) {
      // Redirige vers la page de recherche avec la requête dans l’URL
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchTerm(''); // Réinitialise le champ de recherche
    }
  };

  // --- Calcul du nombre total d’articles dans le panier ---
  const itemCount = cart?.items?.reduce(
    (sum, item) => sum + (item.qty || 0), 
    0
  ) || 0;

  // --- Calcul du total du panier ---
  const total = cart?.total ? Number(cart.total).toFixed(2) : '0.00';

  // --- Détermine si la barre de recherche doit être masquée (ex: sur le panier ou le paiement) ---
  const hideNavSearchbar = location.pathname === '/cart' || location.pathname === '/checkout';

  return (
    <header className="container mx-auto px-4">
      {/* --- Ligne principale du header --- */}
      <div className="flex items-center justify-between gap-4 py-3">

        {/* --- Logo cliquable (redirige vers la page d’accueil) --- */}
        <div className="flex-shrink-0">
          <Link to="/" className="block w-24 h-24 sm:w-28 sm:h-28">
            <img
              src={logo}
              alt="MyStore Logo"
              className="w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* --- Barre de recherche (masquée sur certaines pages) --- */}
        {!hideNavSearchbar && (
          <div className="flex-1 max-w-md w-full">
            <form onSubmit={handleSearch} className="flex gap-2">
              
              {/* Champ de saisie du texte de recherche */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#5a88ca] 
                           focus:border-transparent transition"
                aria-label="Search products"
              />

              {/* Bouton de validation */}
              <button
                type="submit"
                className="px-6 py-2 text-white font-medium bg-[#5a88ca] 
                           hover:bg-[#4c77b5] transition duration-200"
              >
                SEARCH
              </button>
            </form>
          </div>
        )}

        {/* --- Zone du panier (montant + icône + badge de quantité) --- */}
        <div className="flex-shrink-0">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-gray-700 
                       hover:text-[#5a88ca] transition group 
                       border border-gray-700 p-3 shadow-sm hover:shadow-md"
          >
            {/* Texte et total du panier */}
            <span className="font-medium">Cart:</span>
            <span className="font-bold text-[#5a88ca]">
              {isLoading ? '...' : `${total} €`}
            </span>

            {/* Icône du panier */}
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            
            {/* Badge indiquant le nombre d’articles dans le panier */}
            <span
              className={`
                absolute -top-2 -right-2 
                flex items-center justify-center 
                w-6 h-6 text-xs font-bold text-white 
                bg-[#5a88ca] rounded-full 
                ring-2 ring-white shadow-sm
                ${isLoading ? 'animate-pulse' : ''}
              `}
            >
              {isLoading ? '' : itemCount}
            </span>
          </Link>
        </div>
      </div>

      {/* --- Barre de navigation secondaire (catégories, etc.) --- */}
      {!hideNavSearchbar && <Navbar />}
    </header>
  );
};

// Exportation du composant pour utilisation dans l’application
export default Header;
