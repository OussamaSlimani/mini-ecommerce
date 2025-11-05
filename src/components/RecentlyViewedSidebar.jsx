import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

const RecentlyViewedSidebar = () => {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recently Viewed</h2>
      <div className="space-y-4">
        {items.slice(0, 4).map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex gap-3 items-center hover:bg-gray-50 p-2 rounded transition-colors"
          >
            <img
              src={`/products/${product.imageName}`}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="text-sm font-medium text-gray-700 line-clamp-2">{product.name}</h3>
              <div className="text-sm">
                <ins className="text-green-600 font-semibold">${product.price}</ins>
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

export default RecentlyViewedSidebar;