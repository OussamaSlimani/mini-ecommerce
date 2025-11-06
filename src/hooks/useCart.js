import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchCarts, fetchCart, updateCart } from '../services/api';

export const useCart = () => {
  const queryClient = useQueryClient();
  const [cartId, setCartId] = useState(() => localStorage.getItem('cartId'));

  const { data: allCarts = [] } = useQuery({
    queryKey: ['carts'],
    queryFn: fetchCarts,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (allCarts.length > 0 && !cartId) {
      const firstCartId = allCarts[0].id;
      setCartId(firstCartId);
      localStorage.setItem('cartId', firstCartId);
    }
  }, [allCarts, cartId]);

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => fetchCart(cartId),
    enabled: !!cartId,
  });

  const updateMutation = useMutation({
    mutationFn: ({ cartId, updatedCart }) => updateCart(cartId, updatedCart),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  // Helper: Calculate cart totals
  const calculateTotals = (items) => {
    const subTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    return {
      subTotal: Number(subTotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  };

  const updateQuantity = async (itemId, newQty) => {
    if (!cart || newQty < 0) return;

    const updatedItems = cart.items
      .map(item => (item.id === itemId ? { ...item, qty: newQty } : item))
      .filter(item => item.qty > 0);

    const { subTotal, tax, total } = calculateTotals(updatedItems);

    await updateMutation.mutateAsync({
      cartId,
      updatedCart: {
        ...cart,
        items: updatedItems,
        subTotal,
        tax,
        total,
      },
    });
  };

  const removeItem = async (itemId) => {
    if (!cart) return;

    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const { subTotal, tax, total } = calculateTotals(updatedItems);

    await updateMutation.mutateAsync({
      cartId,
      updatedCart: {
        ...cart,
        items: updatedItems,
        subTotal,
        tax,
        total,
      },
    });
  };

  const addItem = async (product, qty = 1) => {
    if (!cart) return;

    const existing = cart.items.find(i => i.id === product.id);
    const updatedItems = existing
      ? cart.items.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      : [...cart.items, { ...product, qty }];

    const { subTotal, tax, total } = calculateTotals(updatedItems);

    await updateMutation.mutateAsync({
      cartId,
      updatedCart: {
        ...cart,
        items: updatedItems,
        subTotal,
        tax,
        total,
      },
    });
  };

  const clearCart = async () => {
    if (!cartId) return;

    const emptyCart = {
      items: [],
      subTotal: 0,
      tax: 0,
      total: 0,
    };

    await updateMutation.mutateAsync({
      cartId,
      updatedCart: emptyCart,
    });
  };

  return {
    cart,
    cartId,
    isLoading,
    error,
    updateQuantity,
    removeItem,
    addItem,
    clearCart, 
    isUpdating: updateMutation.isPending,
  };
};