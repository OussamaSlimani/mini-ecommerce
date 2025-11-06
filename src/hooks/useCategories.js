// --- Importation des hooks React Query ---
import { useQuery } from '@tanstack/react-query';

// --- Importation des fonctions d’API pour les catégories ---
import { fetchCategories, fetchCategoryById } from '../services/api';

/**
 * Hook personnalisé pour récupérer la liste des catégories
 * --------------------------------------------------------
 * - Utilise le cache React Query pour éviter les appels répétés.
 * - Les données restent fraîches pendant 5 minutes (`staleTime`).
 * - Sont conservées en cache 10 minutes supplémentaires (`cacheTime`).
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],       // Clé unique pour la liste de catégories
    queryFn: fetchCategories,       // Fonction API
    staleTime: 1000 * 60 * 5,       // 5 min avant qu'une refetch soit nécessaire
    cacheTime: 1000 * 60 * 10,      // 10 min avant suppression du cache
  });
};

/**
 * Hook personnalisé pour récupérer une catégorie spécifique par ID
 * ----------------------------------------------------------------
 * - N’exécute la requête que si un `id` valide est fourni.
 * - Idéal pour les pages de détail de catégorie.
 */
export const useCategory = (id) => {
  return useQuery({
    queryKey: ['category', id],     // Clé spécifique à chaque catégorie
    queryFn: () => fetchCategoryById(id), // Fonction API pour cette catégorie
    enabled: !!id,                  // Ne s’exécute que si id est défini
    staleTime: 1000 * 60 * 5,       // 5 min de fraîcheur
  });
};
