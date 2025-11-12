import { Link } from "react-router-dom";
import StarRating from "./StarRating";

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
          <ins className="text-[#5a88ca] font-semibold">€{product.price}</ins>
          {product.discountRate > 0 && (
            <del className="text-gray-400 ml-2">
              €
              {Math.round((product.price * 100) / (100 - product.discountRate))}
            </del>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
