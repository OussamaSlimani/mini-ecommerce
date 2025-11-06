// Importation du hook personnalisé et des composants nécessaires
import { useCategories } from '../hooks/useCategories'; // Hook pour récupérer les catégories depuis une API ou un store
import NavItem from './NavItem';                         // Composant de lien individuel dans la barre de navigation
import NavSkeleton from './NavSkeleton';                 // Composant d’attente (squelette) pendant le chargement

// Composant principal : Navbar
// Affiche la barre de navigation principale avec la liste des catégories
const Navbar = () => {
  // Appel du hook useCategories pour récupérer la liste des catégories
  // data : contient les catégories
  // isLoading : indique si les données sont en cours de chargement
  // error : contient une erreur éventuelle lors de la récupération des données
  const { data: categories = [], isLoading, error } = useCategories();

  // Si les données sont en cours de chargement → affiche le squelette de navigation
  if (isLoading) return <NavSkeleton />;

  // Si une erreur s’est produite → affiche un message d’erreur
  if (error)
    return (
      <div className="text-red-500 text-center py-2">
        Failed to load categories
      </div>
    );

  // Si tout s’est bien passé → affiche la barre de navigation
  return (
    <nav className="bg-white shadow-sm">
      {/* Conteneur principal centré */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          {/* Liste des liens de navigation */}
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-6 md:gap-8 py-4 text-sm sm:text-base font-medium">
            
            {/* Lien fixe vers la page d’accueil */}
            <li key="home">
              <NavItem to="/" label="Home" />
            </li>

            {/* Boucle sur la liste des catégories pour générer un lien par catégorie */}
            {categories.map((cat) => (
              <li key={cat.id}>
                {/* Chaque catégorie est un lien dynamique vers sa page */}
                <NavItem to={`/category/${cat.id}`} label={cat.name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Exportation du composant Navbar pour utilisation dans d’autres parties du site
export default Navbar;
