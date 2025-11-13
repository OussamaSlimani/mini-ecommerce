import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { AddressForm } from "../components/checkout/AddressForm";
import { PaymentSection } from "../components/checkout/PaymentSection";
import { OrderSummary } from "../components/checkout/OrderSummary";

const Checkout = () => {
  const { cart, isLoading: cartLoading, resetCart } = useCart();
  const { placeOrder, isLoading, isSuccess, error } = useCheckout();
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const [formData, setFormData] = useState({
    billing: {
      civility: "Mr",
      firstName: "",
      lastName: "",
      companyName: "",
      street: "",
      apartment: "",
      zipCode: "",
      city: "",
      county: "",
      email: "",
      phone: "",
    },
    shipping: {
      civility: "Mr",
      firstName: "",
      lastName: "",
      companyName: "",
      street: "",
      apartment: "",
      zipCode: "",
      city: "",
      county: "",
    },
    orderNotes: "",
    paymentMethod: "bacs",
  });

  const handleInputChange = (section, field, e) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: e.target.value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await placeOrder(cart, { ...formData, shipToDifferent });
      resetCart();
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  if (cartLoading)
    return (
      <div className="text-center py-40">
        <div className="inline-block animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  if (isSuccess)
    return (
      <div className="text-center py-40">
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-4">Order Placed!</h2>
        <Link
          to="/"
          className="inline-block bg-[#5a88ca] text-white px-8 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  if (!cart?.items.length)
    return (
      <div className="text-center py-40">
        <h2 className="text-3xl font-bold mb-4">Cart is empty</h2>
        <Link
          to="/"
          className="inline-block bg-[#5a88ca] text-white px-8 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <>
      <section className="bg-[#5a88ca] py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-white">Checkout</h1>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-[#5a88ca] uppercase mb-6">
                  Billing Details
                </h2>
                <AddressForm
                  data={formData.billing}
                  onChange={(field, e) =>
                    handleInputChange("billing", field, e)
                  }
                />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shipToDifferent}
                    onChange={(e) => setShipToDifferent(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">
                    Ship to different address?
                  </span>
                </label>
                {shipToDifferent && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-[#5a88ca] mb-4">
                      Shipping Address
                    </h3>
                    <AddressForm
                      data={formData.shipping}
                      onChange={(field, e) =>
                        handleInputChange("shipping", field, e)
                      }
                    />
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <label className="block text-sm font-medium mb-2">
                  Order Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.orderNotes}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      orderNotes: e.target.value,
                    }))
                  }
                  placeholder="Special instructions..."
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <OrderSummary cart={cart} />
              <PaymentSection
                method={formData.paymentMethod}
                onChange={(method) =>
                  setFormData((prev) => ({ ...prev, paymentMethod: method }))
                }
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5a88ca] hover:bg-[#4a78b3] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  "Placing Order..."
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Place Order
                  </>
                )}
              </button>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                  {error.message || "Order failed"}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
