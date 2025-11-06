import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '../services/api';
import { useCart } from './useCart';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { cart, cartId, clearCart } = useCart();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      // 1. Clear server cart
      await clearCart();

      // 2. Invalidate to refresh UI
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
    onError: (err) => {
      console.error('Checkout failed:', err);
    },
  });

  const placeOrder = async (formData) => {
    if (!cart || cart.items.length === 0) throw new Error('Cart is empty');

    const order = {
      items: cart.items.map(item => ({
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
        billingAdress: {
          civility: formData.billing.civility,
          firstName: formData.billing.firstName,
          lastName: formData.billing.lastName,
          companyName: formData.billing.companyName || '',
          street: formData.billing.street,
          zipCode: formData.billing.zipCode,
          city: formData.billing.city,
          county: formData.billing.county || '',
        },
        shippingAdress: formData.shipToDifferent
          ? {
              civility: formData.shipping.civility,
              firstName: formData.shipping.firstName,
              lastName: formData.shipping.lastName,
              companyName: formData.shipping.companyName || '',
              street: formData.shipping.street,
              zipCode: formData.shipping.zipCode,
              city: formData.shipping.city,
              county: formData.shipping.county || '',
            }
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
    error: mutation.error,
  };
};