import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../services/api";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const placeOrder = async (cart, { cartId, ...formData }) => {
    if (!cart || !cart.items?.length) throw new Error("Cart is empty");
    if (!cartId) throw new Error("Cart ID is missing");

    const order = {
      items: cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imageName: item.imageName,
        category: item.category || "unknown",
        imagePath: `/products/${item.imageName}`,
        qty: item.qty,
      })),
      subTotal: cart.subTotal,
      tax: cart.tax,
      total: cart.total,
      customer: {
        email: formData.billing.email,
        phone: formData.billing.phone,
        note: formData.orderNotes,
        billingAdress: formData.billing,
        apartment: formData.billing.apartment || "",
        shippingAdress: formData.shipToDifferent ? formData.shipping : formData.billing,
      },
      paymentMethod: formData.paymentMethod,
      cartID: cartId, // Always valid
    };

    return mutation.mutateAsync(order);
  };

  return {
    placeOrder,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};