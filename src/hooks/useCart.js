import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchCarts, fetchCart, updateCart } from '../services/api';

const calculateTotals = (items) => {
  const subTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subTotal * 0.2;
  const total = subTotal + tax;
  return {
    subTotal: Number(subTotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

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
      const id = allCarts[0].id;
      setCartId(id);
      localStorage.setItem('cartId', id);
    }
  }, [allCarts, cartId]);

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => fetchCart(cartId),
    enabled: !!cartId,
  });

  const mutation = useMutation({
    mutationFn: ({ cartId, updatedCart }) => updateCart(cartId, updatedCart),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  const mutateCart = (updatedItems) => {
    if (!cart) return;
    const { subTotal, tax, total } = calculateTotals(updatedItems);
    mutation.mutate({
      cartId,
      updatedCart: { ...cart, items: updatedItems, subTotal, tax, total },
    });
  };

  const updateQuantity = (itemId, qty) => {
    if (!cart || qty < 0) return;
    const items = cart.items
      .map((i) => (i.id === itemId ? { ...i, qty } : i))
      .filter((i) => i.qty > 0);
    mutateCart(items);
  };

  const removeItem = (itemId) => {
    if (!cart) return;
    mutateCart(cart.items.filter((i) => i.id !== itemId));
  };

  const addItem = (product, qty = 1) => {
    if (!cart) return;
    const existing = cart.items.find((i) => i.id === product.id);
    const items = existing
      ? cart.items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      : [...cart.items, { ...product, qty }];
    mutateCart(items);
  };

  const clearCart = () => {
    if (!cartId) return;
    mutation.mutate({
      cartId,
      updatedCart: { items: [], subTotal: 0, tax: 0, total: 0 },
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
    isUpdating: mutation.isPending,
  };
};