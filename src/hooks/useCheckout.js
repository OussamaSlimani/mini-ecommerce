import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../services/api';

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err) => {
      console.error('Checkout failed:', err);
    },
  });

  const placeOrder = async (cart, formData) => {
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const order = {
      items: cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imageName: item.imageName,
        category: item.category || 'unknown',
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
        billingAdress: { ...formData.billing, apartment: undefined },
        shippingAdress: formData.shipToDifferent
          ? formData.shipping
          : formData.billing,
      },
      paymentMethod: formData.paymentMethod,
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