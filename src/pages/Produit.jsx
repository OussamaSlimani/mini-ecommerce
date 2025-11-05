// src/pages/Produit.jsx
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useCategory,useCategories } from '../hooks/useCategories';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import ProductImageGallery from '../components/ProductImageGallery';
import RecentlyViewedSidebar from '../components/RecentlyViewedSidebar';
import OtherBrandsSidebar from '../components/OtherBrandsSidebar';
import { ShoppingCart, Home, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const Produit = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const { addItem } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);

  // Find category from product name or fallback
  const { data: categories = [] } = useCategories();
  const category = categories.find(c => 
    product?.name.toLowerCase().includes(c.name.toLowerCase())
  );

  const { data: categoryDetail } = useCategory(category?.id);

  // Add to recently viewed on mount
  useEffect(() => {
    if (product) {
      addItem(product);
    }
  }, [product, addItem]);

  if (isLoading) return <LoadingState />;
  if (error || !product) return <ErrorState />;

  const originalPrice = product.discountRate > 0
    ? Math.round(product.price * 100 / (100 - product.discountRate))
    : null;

  const mainImage = `/products/${product.imageName}`;
  const thumbnails = [mainImage]; // Extend later if needed

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <RecentlyViewedSidebar />
            <OtherBrandsSidebar currentCategoryId={category?.id} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Breadcrumb */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div>
                <ProductImageGallery mainImage={mainImage} thumbnails={thumbnails} />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-green-600">${product.price}</div>
                  {originalPrice && (
                    <del className="text-xl text-gray-400">${originalPrice}</del>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <form className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </form>

                {/* Description */}
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

// Loading & Error States
const LoadingState = () => (
  <div className="container mx-auto py-20 text-center">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
  </div>
);

const ErrorState = () => (
  <div className="container mx-auto py-20 text-center">
    <p className="text-red-600 text-xl">Product not found.</p>
    <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
      ← Back to Home
    </Link>
  </div>
);

export default Produit;