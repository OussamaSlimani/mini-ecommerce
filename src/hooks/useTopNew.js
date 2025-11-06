// Importation du hook `useQuery` de React Query (TanStack Query)
// Ce hook permet de gérer la récupération asynchrone de données avec cache, gestion d’erreurs et état de chargement.
import { useQuery } from '@tanstack/react-query';

// Importation de la fonction API qui récupère les produits les plus récents ("top new")
import { fetchTopNew } from '../services/api';

// Définition d’un hook personnalisé `useTopNew`
// Ce hook encapsule la logique de récupération des produits récents.
export const useTopNew = () => {
  return useQuery({
    // Clé unique pour identifier cette requête dans le cache de React Query.
    // Cela permet d’éviter les appels API redondants et facilite la mise à jour ciblée.
    queryKey: ['top-new'],

    // Fonction qui appelle l’API pour récupérer les données.
    // `fetchTopNew` doit retourner une promesse contenant la liste des produits récents.
    queryFn: fetchTopNew,
  });
};
