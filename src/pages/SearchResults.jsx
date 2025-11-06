// -------------------------
// IMPORTATIONS
// -------------------------
import { useSearchParams } from 'react-router-dom'; // Pour lire les paramètres de l'URL
import { useSearch } from '../hooks/useSearch'; // Hook personnalisé pour gérer la recherche de produits
import ProductCard from '../components/Category/ProductCard.jsx'; // Composant affichant un produit
import { Search } from 'lucide-react'; // Icône de recherche

// -------------------------
// COMPOSANT PRINCIPAL : SearchResults
// -------------------------
const SearchResults = () => {
  // Lecture du paramètre 'q' dans l'URL pour récupérer la requête de recherche
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Utilisation du hook useSearch pour récupérer les produits filtrés
  const { products, isLoading, searchQuery, setSearchQuery, total } = useSearch(query);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">

        {/* En-tête et info sur le nombre de résultats */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
          </div>
          <p className="text-gray-600">
            {isLoading 
              ? 'Searching...' 
              : `${total} product${total !== 1 ? 's' : ''} found`}
            {query && ` for "${query}"`}
          </p>
        </div>

        {/* Champ de recherche pour affiner la recherche */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to refine search..."
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Affichage des résultats selon l'état */}
        {isLoading ? (
          <LoadingGrid /> // Affiche une grille en chargement
        ) : products.length === 0 ? (
          <EmptyState query={query} /> // Affiche l'état vide si aucun produit trouvé
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} /> // Affichage d'un produit
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// -------------------------
// GRILLE DE CHARGEMENT (SQUELETON)
// -------------------------
const LoadingGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {/* Affiche 8 blocs simulant des produits en chargement */}
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
    ))}
  </div>
);

// -------------------------
// ÉTAT VIDE SI AUCUN PRODUIT
// -------------------------
const EmptyState = ({ query }) => (
  <div className="text-center py-20">
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6"></div>
    <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
    <p className="text-gray-500">
      {query 
        ? `We couldn't find anything for "${query}"` 
        : 'Try searching for a product'}
    </p>
  </div>
);

export default SearchResults;
