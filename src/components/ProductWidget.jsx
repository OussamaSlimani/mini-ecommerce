import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

const ProductItem = ({ product, onView }) => {

  const handleClick = () => {
    onView?.(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      onClick={handleClick}
      className="flex gap-3 p-3 hover:bg-gray-50 transition-colors group"
    >
      <img
        src={`/src/assets/img/products/${product.imageName}`}
        alt={product.name}
        className="w-16 h-16 object-cover rounded"
        loading="lazy"
      />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.review} />
        <div className="mt-1 text-sm">
          <ins className="text-green-600 font-semibold">${product.price}</ins>
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

const ProductWidget = ({ title, items = [], isLoading, viewAllLink, type }) => {
  const [showAll, setShowAll] = useState(false);
  const { addItem } = useRecentlyViewed();

  const displayed = showAll ? items : items.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {items.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        )}
      </div>

      {isLoading ? (
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
        <p className="text-gray-500 text-center py-4">No products found</p>
      ) : (
        <div className="space-y-3">
          {displayed.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onView={type === 'recently-viewed' ? undefined : addItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductWidget;