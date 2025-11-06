// Importation des dépendances nécessaires
import { Link } from 'react-router-dom';           // Permet la navigation interne entre pages
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'; // Hook personnalisé pour gérer les produits récemment consultés

// Composant : RecentlyViewedSidebar
// Affiche dans une sidebar les produits que l'utilisateur a récemment consultés
const RecentlyViewedSidebar = () => {
  // Récupération des produits récemment consultés via le hook personnalisé
  // items contient un tableau d'objets produits
  const { items } = useRecentlyViewed();

  // Si aucun produit n'a été consulté récemment, ne rien afficher
  if (items.length === 0) return null;

  return (
    // Conteneur principal de la sidebar
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Titre de la section */}
      <h2 className="text-2xl font-semibold text-orange-400 uppercase mb-4">
        Recently Viewed
      </h2>

      {/* Liste verticale des produits récemment consultés */}
      <div className="space-y-4">
        {/* On limite l'affichage aux 4 derniers produits consultés */}
        {items.slice(0, 4).map((product) => (
          // Chaque produit est un lien vers sa page de détail
          <Link
            key={product.id}
            to={`/product/${product.id}`} // Lien dynamique vers la page du produit
            className="flex gap-3 items-center hover:bg-gray-50 p-2 rounded transition-colors"
          >
            {/* Image du produit */}
            <img
              src={`../../src/assets/img/products/${product.imageName}`} // Chemin de l’image
              alt={product.name}                                       // Texte alternatif pour l’accessibilité
              className="w-16 h-16 object-cover rounded"               // Taille et style de l’image
            />

            {/* Détails du produit (nom + prix) */}
            <div>
              {/* Nom du produit (tronqué sur deux lignes si trop long) */}
              <h3 className="text-sm font-medium text-gray-700 line-clamp-2">
                {product.name}
              </h3>

              {/* Zone d’affichage du prix et de la réduction éventuelle */}
              <div className="text-sm">
                {/* Prix actuel (en surbrillance bleue) */}
                <ins className="text-[#5a88ca] font-semibold">
                  ${product.price}
                </ins>

                {/* Prix original barré si une réduction existe */}
                {product.discountRate > 0 && (
                  <del className="text-gray-400 ml-1">
                    ${Math.round(product.price * 100 / (100 - product.discountRate))}
                  </del>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Exportation du composant pour l’utiliser dans d’autres parties du site (ex : sidebar de page produit)
export default RecentlyViewedSidebar;
