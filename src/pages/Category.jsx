// --- Importations ---
import { useParams } from 'react-router-dom';          // Pour récupérer l’ID de catégorie depuis l’URL
import { useCategory } from '../hooks/useCategories';   // Hook pour récupérer les données d’une catégorie
import { useProductList } from '../hooks/useProductList'; // Hook pour récupérer la liste des produits
import ProductCard from '../components/Category/ProductCard'; // Composant pour afficher chaque produit

/**
 * Composant : Category
 * -------------------
 * Affiche une page de catégorie avec :
 * - Le nom de la catégorie
 * - La liste des produits (grille)
 * - Skeletons pour le chargement
 * - Gestion des erreurs
 * - Pagination (mockée ici)
 */
const Category = () => {
  // --- Récupère l’ID de la catégorie depuis l’URL ---
  const { id } = useParams();

  // --- Récupère les données de la catégorie via React Query ---
  const { data: category, isLoading: loadingCat, error: catError } = useCategory(id);

  // --- Récupère les produits associés à cette catégorie ---
  const { data: productList, isLoading: loadingProd, error: prodError } = useProductList(category?.productListId);

  // --- Gestion des états de chargement et d’erreur ---
  if (loadingCat) return <LoadingState />;             // Affiche un loader si la catégorie charge
  if (catError || prodError) return <ErrorState />;    // Affiche un message si erreur API

  const products = productList?.items || [];           // Liste des produits ou tableau vide

  return (
    <>
      {/* --- Section Header de la catégorie --- */}
      <section className="bg-[#5a88ca] text-white py-12 px-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold">{category.name}</h1>
        </div>
      </section>

      {/* --- Section Grille des produits --- */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loadingProd ? (
            <ProductGridSkeleton />   // Skeletons si les produits sont en cours de chargement
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No products found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* --- Pagination statique (mockée) --- */}
          <div className="mt-12 flex justify-center">
            <nav aria-label="Page navigation">
              <ul className="flex space-x-2">
                <li>
                  <a href="#" className="px-4 py-2 bg-white border border-gray-300 text-gray-500 rounded-l-md hover:bg-gray-50">
                    Previous
                  </a>
                </li>
                <li><a href="#" className="px-4 py-2 bg-blue-600 text-white">1</a></li>
                <li><a href="#" className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50">2</a></li>
                <li><a href="#" className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50">3</a></li>
                <li>
                  <a href="#" className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-r-md hover:bg-gray-50">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

/**
 * Composant LoadingState
 * ---------------------
 * Affiche un loader circulaire centré.
 */
const LoadingState = () => (
  <div className="container mx-auto py-20 text-center">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

/**
 * Composant ErrorState
 * -------------------
 * Affiche un message d’erreur centré.
 */
const ErrorState = () => (
  <div className="container mx-auto py-20 text-center text-red-600">
    <p>Failed to load category. Please try again later.</p>
  </div>
);

/**
 * Composant ProductGridSkeleton
 * -----------------------------
 * Affiche des cartes de produits en mode skeleton pendant le chargement.
 */
const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div className="bg-gray-200 h-64 rounded"></div>
        <div className="mt-4 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Category;
