import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProductQuantity,
  removeProductFromCart,
} from "../store/cartSlice";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, isLoading, isUpdating } = useSelector((state) => state.cart);

  if (isLoading) return <LoadingState />;
  if (!cart || cart.items.length === 0) return <EmptyState />;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white border-lg shadow-sm overflow-hidden mb-8">
          <table className="w-full text-sm border border-gray-300 border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-center py-3 font-semibold text-gray-800 uppercase border border-gray-300">
                  Action
                </th>
                <th className="text-center py-3 font-semibold text-gray-800 uppercase border border-gray-300">
                  Image
                </th>
                <th className="text-center py-3 font-semibold text-gray-800 uppercase border border-gray-300">
                  Product
                </th>
                <th className="text-center py-3 font-semibold text-gray-800 uppercase border border-gray-300">
                  Price
                </th>
                <th className="text-center py-3 font-semibold text-gray-800 uppercase border border-gray-300">
                  Quantity
                </th>
                <th className="text-center py-3 font-semibold text-gray-800 uppercase border border-gray-300">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="text-center border border-gray-300 py-4">
                    <button
                      onClick={() => dispatch(removeProductFromCart(item.id))}
                      disabled={isUpdating}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5 mx-auto" />
                    </button>
                  </td>
                  <td className="text-center border border-gray-300 py-4">
                    <Link
                      to={`/product/${item.id}`}
                      className="flex justify-center"
                    >
                      <img
                        src={`/src/assets/img/products/${item.imageName}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                    </Link>
                  </td>
                  <td className="text-center border border-gray-300 py-4">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-gray-800 hover:text-blue-600 font-medium block"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="text-center py-4 text-gray-700 border border-gray-300">
                    {item.price.toFixed(2)} €
                  </td>
                  <td className="text-center border border-gray-300 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateProductQuantity(item.id, Math.max(1, item.qty - 1))
                          )
                        }
                        disabled={isUpdating || item.qty <= 1}
                        className="bg-[#5a88ca] text-white p-3 disabled:opacity-50 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            updateProductQuantity(item.id, parseInt(e.target.value) || 1)
                          )
                        }
                        min="1"
                        className="w-16 text-center border border-gray-300 p-3"
                        disabled={isUpdating}
                      />
                      <button
                        onClick={() => dispatch(updateProductQuantity(item.id, item.qty + 1))}
                        disabled={isUpdating}
                        className="bg-[#5a88ca] text-white p-3 disabled:opacity-50 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="text-center py-4 text-gray-900 font-semibold border border-gray-300 p-2">
                    {(item.price * item.qty).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-center">
            <Link
              to="/checkout"
              className="px-6 py-2 bg-[#5a88ca] text-white font-medium inline-flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Checkout
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#5a88ca] uppercase mb-4">
              You may be interested in...
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {staticCrossSells.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center border-lg p-3 hover:shadow-md transition"
                >
                  <img
                    src={`/src/assets/img/products/${product.imageName}`}
                    alt={product.name}
                    className="w-24 h-50 object-cover mb-2"
                  />
                  <h3 className="text-sm font-medium text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.price.toFixed(2)} €
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="px-4 py-2 bg-[#5a88ca] text-white text-sm"
                  >
                    Add to Cart
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-white shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#5a88ca] uppercase mb-4">
              Cart Totals
            </h2>
            <table className="w-full text-sm border border-gray-300">
              <tbody>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium border-r w-1/2 bg-gray-100">
                    Cart Subtotal
                  </th>
                  <td className="py-2 px-4 text-right">
                    {cart.subTotal.toFixed(2)} €
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium border-r w-1/2 bg-gray-100">
                    Tax (20%)
                  </th>
                  <td className="py-2 px-4 text-right">
                    {cart.tax.toFixed(2)} €
                  </td>
                </tr>
                <tr>
                  <th className="text-left py-2 px-4 font-bold border-r w-1/2 bg-gray-100">
                    Order Total
                  </th>
                  <td className="py-2 px-4 text-right font-bold text-green-700">
                    {cart.total.toFixed(2)} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const staticCrossSells = [
  { id: 1, name: "Apple iPad", imageName: "apple-ipad-97-2018.jpg", price: 20 },
  { id: 2, name: "Huawei Y6 Pro", imageName: "huawei-y6-pro-2019-.jpg", price: 20 },
];

const LoadingState = () => (
  <div className="container mx-auto py-40 text-center">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
    <p className="mt-4 text-gray-600">Loading cart...</p>
  </div>
);

const EmptyState = () => (
  <div className="container mx-auto py-40 text-center">
    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-800 mb-2">
      Your cart is empty
    </h2>
    <p className="text-gray-600 mb-6">
      Looks like you haven't added anything to your cart yet.
    </p>
    <Link to="/" className="bg-[#5a88ca] text-white px-6 py-3">
      Continue Shopping
    </Link>
  </div>
);

export default Cart;