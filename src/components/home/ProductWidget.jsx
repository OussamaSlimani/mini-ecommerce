import { useState } from "react";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";
import ProductItem from "./ProductItem";

const ProductWidget = ({ title, items = [], isLoading, type }) => {
  const [showAll, setShowAll] = useState(false);
  const { addRecentlyViewedItem } = useRecentlyViewed();

  const displayedItems = showAll ? items : items.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {items.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-[#5a88ca] text-white px-3 py-2 text-sm"
          >
            {showAll ? "Show Less" : "View All"}
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
      ) : displayedItems.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No products found</p>
      ) : (
        <div className="space-y-3">
          {displayedItems.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onView={
                type === "recently-viewed" ? undefined : addRecentlyViewedItem
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductWidget;
