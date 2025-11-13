import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchCart, updateCart, createCart } from "../services/api";

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
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));

  const createMutation = useMutation({
    mutationFn: createCart,
    onSuccess: (newCart) => {
      const id = newCart.id;
      setCartId(id);
      localStorage.setItem("cartId", id);
      queryClient.setQueryData(["cart", id], newCart);
    },
  });

  useEffect(() => {
    if (!cartId && !createMutation.isPending) {
      createMutation.mutate();
    }
  }, [cartId, createMutation]);

  const {
    data: cart,
    isLoading: isCartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => fetchCart(cartId),
    enabled: !!cartId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: ({ cartId, updatedCart }) => updateCart(cartId, updatedCart),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(["cart", cartId], updatedCart);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", cartId] });
    },
  });

  const mutateCart = (updatedItems) => {
    if (!cart || !cartId) return;
    const { subTotal, tax, total } = calculateTotals(updatedItems);
    updateMutation.mutate({
      cartId,
      updatedCart: { ...cart, items: updatedItems, subTotal, tax, total },
    });
  };

  const addProductToCart = (product, qty = 1) => {
    if (!cart) return;
    const existing = cart.items.find((i) => i.id === product.id);
    const items = existing
      ? cart.items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      : [...cart.items, { ...product, qty }];
    mutateCart(items);
  };

  const updateProductQuantity = (productId, qty) => {
    if (!cart || qty < 0) return;
    const items = cart.items
      .map((i) => (i.id === productId ? { ...i, qty } : i))
      .filter((i) => i.qty > 0);
    mutateCart(items);
  };

  const removeProductFromCart = (productId) => {
    if (!cart) return;
    mutateCart(cart.items.filter((i) => i.id !== productId));
  };

  const resetCart = () => {
    localStorage.removeItem("cartId");
    setCartId(null);
    queryClient.removeQueries({ queryKey: ["cart"] });
  };

  const isLoading = createMutation.isPending || isCartLoading;
  const isUpdating = updateMutation.isPending;
  const error = cartError || createMutation.error || updateMutation.error;

  return {
    cart,
    cartId,
    isLoading,
    isUpdating,
    isCreating: createMutation.isPending,
    error,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    resetCart,
  };
};