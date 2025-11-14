import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import { AddressForm } from "../components/checkout/AddressForm";
import { PaymentSection } from "../components/checkout/PaymentSection";
import { OrderSummary } from "../components/checkout/OrderSummary";

const Checkout = () => {
  const { cart, cartId, isLoading: cartLoading, resetCart } = useCart();
  const { placeOrder, isLoading, isSuccess, error } = useCheckout();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
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
      shipToDifferent: false
    },
  });

  const shipToDifferent = watch("shipToDifferent");

const onSubmit = async (data) => {
  await placeOrder(cart, { ...data, cartId });
  resetCart();
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
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left Column */}
            <div className="space-y-6">
              {/* Billing Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-[#5a88ca] uppercase mb-6">
                  Billing Details
                </h2>
                <AddressForm
                  prefix="billing"
                  register={register}
                  errors={errors.billing}
                />
              </div>

              {/* Ship to Different Address */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("shipToDifferent")}
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Ship to different address?</span>
                </label>

                {shipToDifferent && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-[#5a88ca] mb-4">
                      Shipping Address
                    </h3>
                    <AddressForm
                      prefix="shipping"
                      register={register}
                      errors={errors.shipping}
                    />
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <label className="block text-sm font-medium mb-2">
                  Order Notes
                </label>
                <textarea
                  {...register("orderNotes")}
                  rows={3}
                  placeholder="Special instructions..."
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <OrderSummary cart={cart} />

              <PaymentSection
                value={watch("paymentMethod")}
                onChange={(method) => setValue("paymentMethod", method)}
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