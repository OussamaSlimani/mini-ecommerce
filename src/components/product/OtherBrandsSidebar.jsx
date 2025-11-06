// Importation des dépendances nécessaires
import { Link } from 'react-router-dom';         // Permet la navigation interne sans rechargement de page
import { useCategories } from '../../hooks/useCategories'; // Hook personnalisé pour récupérer la liste des catégories

// Composant : OtherBrandsSidebar
// Affiche une liste d'autres marques (catégories) dans une sidebar
const OtherBrandsSidebar = ({ currentCategoryId }) => {
  // Récupération des catégories via le hook personnalisé
  // data : contient la liste des catégories
  // isLoading : indique si les données sont en cours de chargement
  const { data: categories = [], isLoading } = useCategories();

  // Filtrage des catégories pour exclure celle actuellement affichée
  // Limite ensuite la liste aux 5 premières
  const otherBrands = categories
    .filter(cat => cat.id !== currentCategoryId)
    .slice(0, 5);

  // Si les données sont en cours de chargement ou qu’il n’y a pas d’autres marques à afficher,
  // on ne rend rien (retourne null)
  if (isLoading || otherBrands.length === 0) return null;

  return (
    // Conteneur principal de la sidebar
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      {/* Titre de la section */}
      <h2 className="text-2xl font-semibold text-orange-400 uppercase mb-4">
        Other Brands
      </h2>

      {/* Liste des autres marques */}
      <ul className="space-y-2">
        {otherBrands.map((cat) => (
          <li key={cat.id}>
            {/* Chaque marque est un lien vers sa page de catégorie */}
            <Link
              to={`/category/${cat.id}`}  // Chemin dynamique vers la catégorie correspondante
              className="block text-gray-600 hover:text-blue-600 transition-colors"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exportation du composant pour l’utiliser dans d’autres parties du site
export default OtherBrandsSidebar;
