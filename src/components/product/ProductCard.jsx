import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../store/cartSlice";
import { useState } from "react";
import ShowToast from "../ShowToast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isUpdating = useSelector((state) => state.cart.isUpdating);
  const [toast, setToast] = useState(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addProductToCart(
        {
          id: product.id,
          name: product.name,
          imageName: product.imageName,
          price: product.price,
        },
        1
      )
    );
    setToast({
      type: "success",
      message: "Product added to cart!",
    });
  };

  const imageUrl = `/src/assets/img/products/${product.imageName}`;
  const originalPrice =
    product.discountRate > 0
      ? Math.round((product.price * 100) / (100 - product.discountRate))
      : null;

  return (
    <>
      {toast && (
        <ShowToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all border duration-300 overflow-hidden flex flex-col h-full">
        <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
          <div className="relative aspect-square w-full bg-gray-50 p-2 flex items-center justify-center overflow-hidden">
            <img
              src={imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {product.discountRate > 0 && (
              <span className="absolute top-2 left-2 bg-[#5a88ca] text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discountRate}%
              </span>
            )}
          </div>
          <div className="p-2 flex flex-col flex-grow">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-2 group-hover:text-[#5a88ca] transition-colors">
              {product.name}
            </h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xl font-bold text-[#5a88ca]">
                €{product.price}
              </span>
              {originalPrice && (
                <del className="text-sm text-gray-400">€{originalPrice}</del>
              )}
            </div>
          </div>
        </Link>
        <div className="px-4 pb-4 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isUpdating}
            className={`
              w-full bg-[#5a88ca] text-white py-3 px-4
              font-medium text-sm flex items-center justify-center gap-2
              hover:bg-[#4a78b8] focus:outline-none focus:ring-2 focus:ring-[#5a88ca] focus:ring-offset-2
              disabled:opacity-70 disabled:cursor-not-allowed
              transition-all duration-200
            `}
            aria-label={
              isUpdating ? "Adding to cart..." : `Add ${product.name} to cart`
            }
          >
            <ShoppingCart className="w-5 h-5" />
            {isUpdating ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;