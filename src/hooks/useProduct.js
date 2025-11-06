// Importation du hook useQuery depuis React Query (TanStack Query)
// useQuery permet de gérer la récupération de données asynchrones avec cache, rechargement, etc.
import { useQuery } from '@tanstack/react-query';

// Importation de la fonction de récupération du produit (requête API)
import { fetchProduct } from '../services/api';

// Définition du hook personnalisé useProduct
// Ce hook permet de récupérer les informations d’un produit à partir de son ID
export const useProduct = (id) => {
  return useQuery({
    // Clé unique de la requête pour la mise en cache
    // Chaque produit aura sa propre entrée dans le cache grâce à son ID
    queryKey: ['product', id],

    // Fonction de récupération (query function)
    // Appelle la fonction fetchProduct en lui passant l’ID du produit
    queryFn: () => fetchProduct(id),

    // Option "enabled" : empêche la requête de se lancer tant que l’ID n’est pas défini
    // (!!id convertit la valeur en booléen → false si null/undefined)
    enabled: !!id,
  });
};
