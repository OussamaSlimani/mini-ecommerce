import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const imageUrl = `../src/assets/img/products/${product.imageName}`;
    const originalPrice = product.discountRate > 0
        ? Math.round(product.price * 100 / (100 - product.discountRate))
        : null;

    return (
        <div className="group relative bg-white rounded-lg border-2 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="w-48 h-100 m-auto p-2">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <Link to={`/product/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>

                <div className="mt-2 flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-green-600">${product.price}</span>
                        {originalPrice && (
                            <del className="text-sm text-gray-400 ml-2">${originalPrice}</del>
                        )}
                    </div>
                </div>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;