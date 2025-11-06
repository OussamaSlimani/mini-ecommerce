// Importation des hooks de React Query :
// - useMutation pour gérer les opérations d’écriture (POST, PUT, DELETE…)
// - useQueryClient pour accéder et manipuler le cache de React Query
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Importation de la fonction API permettant de créer une commande
import { createOrder } from '../services/api';

// Importation du hook personnalisé `useCart` pour accéder au panier et aux actions liées
import { useCart } from './useCart';

// Définition d’un hook personnalisé `useCheckout`
// Ce hook encapsule toute la logique liée à la validation d’une commande
export const useCheckout = () => {
  // Récupération du client de cache de React Query pour gérer les requêtes et les invalidations
  const queryClient = useQueryClient();

  // Récupération des données et actions du panier (cart, cartId, clearCart)
  const { cart, cartId, clearCart } = useCart();

  // Configuration de la mutation (création de commande)
  const mutation = useMutation({
    // Fonction asynchrone appelée pour exécuter la mutation (création de la commande)
    mutationFn: createOrder,

    // Callback exécuté en cas de succès de la mutation
    onSuccess: async () => {
      // 1️⃣ Vider le panier côté serveur après la création réussie de la commande
      await clearCart();

      // 2️⃣ Invalider les requêtes liées au panier pour forcer un rafraîchissement du cache et de l’UI
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    },

    // Callback exécuté en cas d’erreur lors de la mutation
    onError: (err) => {
      console.error('Checkout failed:', err);
    },
  });

  // Fonction principale qui prépare et envoie la commande au serveur
  const placeOrder = async (formData) => {
    // Vérifie qu’il y a bien des articles dans le panier avant de poursuivre
    if (!cart || cart.items.length === 0) throw new Error('Cart is empty');

    // Construction de l’objet commande au format attendu par l’API
    const order = {
      // Liste des articles du panier
      items: cart.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        imageName: item.imageName,
        category: item.category || 'unknown',
        imagePath: `/products/${item.imageName}`,
        qty: item.qty,
      })),
      // Totaux et taxes
      subTotal: cart.subTotal,
      tax: cart.tax,
      total: cart.total,
      // Informations client
      customer: {
        email: formData.billing.email,
        phone: formData.billing.phone,
        note: formData.orderNotes,
        // Adresse de facturation
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
        // Adresse de livraison (différente uniquement si `shipToDifferent` est vrai)
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
      // Méthode de paiement sélectionnée par l’utilisateur
      paymentMethod: formData.paymentMethod,
    };

    // Envoi de la commande via la mutation React Query
    return mutation.mutateAsync(order);
  };

  // Le hook retourne les éléments utiles pour l’interface
  return {
    // Fonction à appeler pour lancer la commande
    placeOrder,
    // États utiles pour la gestion du statut de la mutation
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
