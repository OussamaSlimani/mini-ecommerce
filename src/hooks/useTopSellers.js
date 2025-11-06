// --- Importation des outils React Query ---
import { useQuery } from '@tanstack/react-query';

// --- Importation de la fonction API pour récupérer les meilleures ventes ---
import { fetchTopSellers } from '../services/api';

/**
 * Hook personnalisé : useTopSellers
 * ---------------------------------
 * Récupère la liste des produits les plus vendus depuis l'API.
 *
 * ✅ Avantages :
 * - Gère automatiquement le chargement, les erreurs et le cache via React Query.
 * - Évite les appels API répétés grâce à la mise en cache intelligente.
 * - Peut être réutilisé dans plusieurs composants (section “Top Sellers”, “Home”, etc.).
 *
 * @returns {object} - Données et états de React Query :
 *  { data, isLoading, error, refetch, ... }
 */
export const useTopSellers = () => {
  return useQuery({
    queryKey: ['top-sellers'],  // Clé unique pour le cache des meilleures ventes
    queryFn: fetchTopSellers,   // Fonction API pour récupérer les données
    staleTime: 1000 * 60 * 5,   // (optionnel) 5 minutes avant une nouvelle requête
    cacheTime: 1000 * 60 * 10,  // (optionnel) 10 minutes de conservation du cache
  });
};
