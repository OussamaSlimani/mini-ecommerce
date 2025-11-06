// Importation du hook `useQuery` depuis la librairie React Query (TanStack Query)
// Ce hook permet de gérer les requêtes asynchrones (fetch, cache, états de chargement, erreurs, etc.)
import { useQuery } from '@tanstack/react-query';

// Importation d’une fonction personnalisée qui va récupérer une catégorie par son ID depuis une API
import { fetchCategoryById } from '../services/api';

// Définition d’un hook personnalisé React appelé `useCategory`
export const useCategory = (id) => {
  return useQuery({
    // `queryKey` sert à identifier de manière unique la requête dans le cache de React Query
    // Ici, le cache sera indexé par ['category', id], ce qui permet d’avoir un cache distinct pour chaque catégorie
    queryKey: ['category', id],

    // `queryFn` est la fonction asynchrone appelée pour récupérer les données
    // On appelle `fetchCategoryById` avec l'ID passé en argument
    queryFn: () => fetchCategoryById(id),

    // `enabled` permet d’activer ou non la requête automatiquement
    // Ici, la requête ne sera exécutée que si `id` a une valeur (évite les requêtes inutiles)
    enabled: !!id,
  });
};
