// Importation des dépendances nécessaires
import { Link } from 'react-router-dom'; // Permet la navigation interne sans recharger la page
import { ShoppingCart } from 'lucide-react'; // Icône de panier d'achat
import { useCart } from '../../hooks/useCart'; // Hook personnalisé pour gérer le panier

// Composant ProductCard : affiche une carte de produit avec image, prix et bouton d'ajout au panier
const ProductCard = ({ product }) => {
  // Récupération des fonctions et états du panier via le hook useCart
  const { addItem, isUpdating } = useCart();

  // Fonction pour gérer l'ajout d'un produit au panier
  const handleAddToCart = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page ou la redirection du lien
    e.stopPropagation(); // Empêche la propagation de l'événement vers le parent (le <Link>)
    
    // Appel de la fonction addItem pour ajouter le produit au panier
    addItem(
      {
        id: product.id,
        name: product.name,
        imageName: product.imageName,
        price: product.price,
      },
      1 // Quantité : 1 par défaut
    );
  };

  // Construction du chemin vers l’image du produit
  const imageUrl = `/src/assets/img/products/${product.imageName}`;

  // Calcul du prix original avant réduction (si une réduction existe)
  const originalPrice = product.discountRate > 0
    ? Math.round(product.price * 100 / (100 - product.discountRate))
    : null;

  return (
    // Conteneur principal de la carte produit
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all border duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Lien vers la page du produit */}
      <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
        
        {/* Section image du produit */}
        <div className="relative aspect-square w-full bg-gray-50 p-2 flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy" // Améliore les performances en chargeant l'image à la demande
          />

          {/* Badge de réduction affiché si le produit est en promotion */}
          {product.discountRate > 0 && (
            <span className="absolute top-2 left-2 bg-[#5a88ca] text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discountRate}%
            </span>
          )}
        </div>

        {/* Informations sur le produit : nom et prix */}
        <div className="p-2 flex flex-col flex-grow">
          <h3 className="text-lg font-medium text-gray-800 line-clamp-2 group-hover:text-[#5a88ca] transition-colors">
            {product.name}
          </h3>

          {/* Affichage du prix actuel et du prix barré si réduction */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xl font-bold text-[#5a88ca]">${product.price}</span>
            {originalPrice && (
              <del className="text-sm text-gray-400">${originalPrice}</del>
            )}
          </div>
        </div>
      </Link>

      {/* Bouton d'ajout au panier */}
      <div className="px-4 pb-4 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={isUpdating} // Désactivé pendant la mise à jour du panier
          className={`
            w-full bg-[#5a88ca] text-white py-3 px-4 
            font-medium text-sm flex items-center justify-center gap-2
            hover:bg-[#4a78b8] focus:outline-none focus:ring-2 focus:ring-[#5a88ca] focus:ring-offset-2
            disabled:opacity-70 disabled:cursor-not-allowed
            transition-all duration-200
          `}
          aria-label={isUpdating ? 'Adding to cart...' : `Add ${product.name} to cart`}
        >
          <ShoppingCart className="w-5 h-5" /> {/* Icône de panier */}
          {isUpdating ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Exportation du composant pour utilisation dans d'autres parties de l'application
export default ProductCard;
