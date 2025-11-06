// --- Importations des hooks React Query et React ---
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// --- Importation des fonctions d’API pour gérer les paniers ---
import { fetchCarts, fetchCart, updateCart } from '../services/api';

// --- Hook personnalisé : useCart ---
// Ce hook gère la logique du panier (chargement, mise à jour, suppression, ajout d’articles...).
export const useCart = () => {

  // Instance du client de cache React Query pour gérer l’invalidation et la synchronisation
  const queryClient = useQueryClient();

  // État local pour mémoriser l’ID du panier (stocké dans le localStorage)
  const [cartId, setCartId] = useState(() => localStorage.getItem('cartId'));

  // --- 1. Chargement de tous les paniers disponibles ---
  // (utile si le backend retourne plusieurs paniers utilisateurs)
  const { data: allCarts = [] } = useQuery({
    queryKey: ['carts'],     // Clé de cache unique
    queryFn: fetchCarts,     // Fonction API pour récupérer tous les paniers
    staleTime: 1000 * 60 * 5, // Données valides pendant 5 minutes
  });

  // --- 2. Sélection automatique d’un panier si aucun n’est enregistré ---
  useEffect(() => {
    if (allCarts.length > 0 && !cartId) {
      const firstCartId = allCarts[0].id;
      setCartId(firstCartId);
      localStorage.setItem('cartId', firstCartId); // Sauvegarde locale
    }
  }, [allCarts, cartId]);

  // --- 3. Récupération du panier actif ---
  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart', cartId],     // Chaque panier a sa propre clé
    queryFn: () => fetchCart(cartId), // Fonction API pour un panier précis
    enabled: !!cartId,               // N’exécute la requête que si un cartId existe
  });

  // --- 4. Mutation pour mettre à jour le panier ---
  const updateMutation = useMutation({
    mutationFn: ({ cartId, updatedCart }) => updateCart(cartId, updatedCart),
    onSuccess: () => {
      // Invalidation du cache après modification
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },
  });

  // --- 5. Fonction utilitaire : calcul des totaux ---
  const calculateTotals = (items) => {
    const subTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subTotal * 0.2; // Exemple : TVA à 20%
    const total = subTotal + tax;

    return {
      subTotal: Number(subTotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  };

  // --- 6. Mise à jour de la quantité d’un article ---
  const updateQuantity = async (itemId, newQty) => {
    if (!cart || newQty < 0) return;

    // Met à jour la quantité ou supprime l’article si quantité = 0
    const updatedItems = cart.items
      .map(item => (item.id === itemId ? { ...item, qty: newQty } : item))
      .filter(item => item.qty > 0);

    const { subTotal, tax, total } = calculateTotals(updatedItems);

    // Envoi de la mise à jour au serveur
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

  // --- 7. Suppression d’un article du panier ---
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

  // --- 8. Ajout d’un nouvel article au panier ---
  const addItem = async (product, qty = 1) => {
    if (!cart) return;

    // Si l’article existe déjà, on augmente sa quantité
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

  // --- 9. Vider complètement le panier ---
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

  // --- 10. Valeurs retournées par le hook ---
  return {
    cart,             // Données du panier
    cartId,           // Identifiant du panier
    isLoading,        // Chargement du panier
    error,            // Gestion des erreurs
    updateQuantity,   // Modifier la quantité
    removeItem,       // Supprimer un article
    addItem,          // Ajouter un article
    clearCart,        // Vider le panier
    isUpdating: updateMutation.isPending, // État de mise à jour
  };
};
