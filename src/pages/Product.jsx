// -------------------------
// IMPORTATIONS
// -------------------------
import { useParams, Link } from 'react-router-dom'; // Pour récupérer l'ID du produit depuis l'URL et la navigation
import { useProduct } from '../hooks/useProduct'; // Hook pour récupérer un produit par ID
import { useCategory } from '../hooks/useCategory'; // Hook pour récupérer une catégorie par ID
import { useCategories } from '../hooks/useCategories'; // Hook pour récupérer toutes les catégories
import { useRecentlyViewed } from '../hooks/useRecentlyViewed'; // Hook pour gérer les produits récemment vus
import { useCart } from '../hooks/useCart'; // Hook pour gérer le panier
import { ShoppingCart, Home, ChevronRight } from 'lucide-react'; // Icônes
import { useEffect, useState } from 'react'; // Hooks React pour l'état et les effets
import ProductImageGallery from '../components/product/ProductImageGallery'; // Galerie d'images du produit
import RecentlyViewedSidebar from '../components/product/RecentlyViewedSidebar'; // Sidebar produits récemment vus
import OtherBrandsSidebar from '../components/product/OtherBrandsSidebar'; // Sidebar autres produits de la même catégorie

// -------------------------
// COMPOSANT PRINCIPAL PRODUCT
// -------------------------
const Product = () => {
  // Récupère l'ID du produit depuis l'URL
  const { id } = useParams();

  // Récupération des données du produit
  const { data: product, isLoading, error } = useProduct(id);

  // Hook pour ajouter un produit aux récemment vus
  const { addItem: addToRecentlyViewed } = useRecentlyViewed();

  // Hook pour ajouter un produit au panier
  const { addItem: addToCart, isUpdating: isCartUpdating } = useCart();

  // État local pour la quantité choisie par l'utilisateur
  const [quantity, setQuantity] = useState(1);

  // Récupère toutes les catégories
  const { data: categories = [] } = useCategories();

  // Trouve la catégorie correspondant au produit (basé sur le nom)
  const category = categories.find(c =>
    product?.name.toLowerCase().includes(c.name.toLowerCase())
  );

  // Récupération des détails de la catégorie si elle existe
  const { data: categoryDetail } = useCategory(category?.id);

  // Ajout du produit aux produits récemment vus dès qu'il est chargé
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  // Affichage de l'état de chargement ou d'erreur si nécessaire
  if (isLoading) return <LoadingState />;
  if (error || !product) return <ErrorState />;

  // Calcul du prix original si un taux de remise est appliqué
  const originalPrice = product.discountRate > 0
    ? Math.round(product.price * 100 / (100 - product.discountRate))
    : null;

  // Images principales et miniatures du produit
  const mainImage = `../src/assets/img/products/${product.imageName}`;
  const thumbnails = [
    '../src/assets/img/thumb/product-thumb-1.jpg',
    '../src/assets/img/thumb/product-thumb-2.jpg',
    '../src/assets/img/thumb/product-thumb-3.jpg',
  ];

  // Fonction pour ajouter le produit au panier avec la quantité choisie
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      {
        id: product.id,
        name: product.name,
        imageName: product.imageName,
        price: product.price,
      },
      quantity
    );
    setQuantity(1); // Réinitialise la quantité après ajout
  };

  // -------------------------
  // RENDER DU COMPOSANT
  // -------------------------
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar gauche : produits récemment vus et autres marques */}
          <div className="lg:col-span-1 space-y-6">
            <RecentlyViewedSidebar />
            <OtherBrandsSidebar currentCategoryId={category?.id} />
          </div>

          {/* Contenu principal du produit */}
          <div className="lg:col-span-3">

            {/* Fil d'Ariane / Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <Link to="/" className="flex items-center hover:text-blue-600">
                <Home className="w-4 h-4 mr-1" /> Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={`/category/${category?.id}`} className="hover:text-blue-600">
                {category?.name || 'Category'}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{product.name}</span>
            </nav>

            {/* Grille pour images et informations du produit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Galerie d'images */}
              <div>
                <ProductImageGallery mainImage={mainImage} thumbnails={thumbnails} />
              </div>

              {/* Informations produit */}
              <div className="space-y-6">
                {/* Nom du produit */}
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

                {/* Prix et prix original si remise */}
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-[#5a88ca]">${product.price}</div>
                  {originalPrice && (
                    <del className="text-xl text-gray-400">${originalPrice}</del>
                  )}
                </div>

                {/* Quantité et bouton ajouter au panier */}
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isCartUpdating}
                    className="flex-1 bg-[#5a88ca] text-white py-3 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isCartUpdating ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>

                {/* Description du produit */}
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Product Description</h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------------
// LOADING STATE
// -------------------------
const LoadingState = () => (
  <div className="container mx-auto py-20 text-center">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
    <p className="mt-4 text-gray-600">Loading product...</p>
  </div>
);

// -------------------------
// ERROR STATE
// -------------------------
const ErrorState = () => (
  <div className="container mx-auto py-20 text-center">
    <p className="text-red-600 text-xl">Product not found.</p>
    <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
      ← Back to Home
    </Link>
  </div>
);

export default Product;
