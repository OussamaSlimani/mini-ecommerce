// --- Importation des outils React Query ---
import { useQuery } from '@tanstack/react-query';

// --- Importation de la fonction API pour récupérer une liste de produits ---
import { fetchProductList } from '../services/api';

/**
 * Hook personnalisé : useProductList
 * -----------------------------------
 * Récupère une liste de produits spécifique à partir de son ID.
 * 
 * ✅ Utilise React Query pour :
 * - Gérer le cache des données (évite les appels API répétés)
 * - Fournir automatiquement le statut `isLoading`, `error` et `data`
 * - Rafraîchir automatiquement si `listId` change
 * 
 * @param {string|number} listId - L'identifiant de la liste de produits à récupérer.
 * @returns {object} - Un objet React Query contenant { data, isLoading, error, ... }
 */
export const useProductList = (listId) => {
  return useQuery({
    queryKey: ['product-list', listId],   // Clé unique pour chaque liste
    queryFn: () => fetchProductList(listId), // Fonction de récupération API
    enabled: !!listId,                    // N’exécute la requête que si listId est défini
    staleTime: 1000 * 60 * 5,             // (optionnel) 5 minutes avant un nouveau fetch
    cacheTime: 1000 * 60 * 10,            // (optionnel) 10 minutes de cache
  });
};
