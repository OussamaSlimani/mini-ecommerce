// Importation des dépendances React et des composants/utilitaires nécessaires
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import StarRating from './StarRating';

// --- Composant pour un produit individuel ---
const ProductItem = ({ product, onView }) => {

  // Fonction appelée lorsqu’on clique sur un produit
  const handleClick = () => {
    // Si une fonction onView est fournie, on l’exécute avec le produit comme argument
    onView?.(product);
  };

  return (
    // Le produit est encapsulé dans un lien vers sa page détaillée
    <Link
      to={`/product/${product.id}`}
      onClick={handleClick}
      className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group"
    >
      {/* Image du produit */}
      <img
        src={`/src/assets/img/products/${product.imageName}`}
        alt={product.name}
        className="w-16 h-16 object-cover rounded"
        loading="lazy" // améliore les performances (chargement différé)
      />

      {/* Contenu texte du produit */}
      <div className="flex-1">
        {/* Nom du produit */}
        <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2">
          {product.name}
        </h3>

        {/* Note du produit (étoiles) */}
        <StarRating rating={product.review} />

        {/* Prix et remise éventuelle */}
        <div className="mt-1 text-sm">
          {/* Prix actuel */}
          <ins className="text-[#5a88ca] font-semibold">${product.price}</ins>

          {/* Prix barré si une remise est appliquée */}
          {product.discountRate > 0 && (
            <del className="text-gray-400 ml-2">
              ${Math.round(product.price * 100 / (100 - product.discountRate))}
            </del>
          )}
        </div>
      </div>
    </Link>
  );
};

// --- Composant principal : widget affichant une liste de produits ---
const ProductWidget = ({ title, items = [], isLoading, viewAllLink, type }) => {
  // État local pour afficher soit une partie, soit tous les produits
  const [showAll, setShowAll] = useState(false);

  // Hook personnalisé pour gérer les produits récemment consultés
  const { addItem } = useRecentlyViewed();

  // Si "showAll" est vrai, on affiche tous les produits, sinon seulement les 3 premiers
  const displayed = showAll ? items : items.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* En-tête du widget (titre + bouton d’affichage) */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

        {/* Bouton pour afficher plus ou moins de produits si la liste dépasse 3 éléments */}
        {items.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#5a88ca] text-white p-3"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        )}
      </div>

      {/* Contenu principal du widget */}
      {isLoading ? (
        // --- État de chargement : affichage de squelettes (animation pulse) ---
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="bg-gray-200 rounded w-16 h-16"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : displayed.length === 0 ? (
        // --- Aucun produit à afficher ---
        <p className="text-gray-500 text-center py-4">No products found</p>
      ) : (
        // --- Liste des produits ---
        <div className="space-y-3">
          {displayed.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              // Si le type n’est pas "recently-viewed", on ajoute le produit aux récents
              onView={type === 'recently-viewed' ? undefined : addItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Exportation du composant principal
export default ProductWidget;
