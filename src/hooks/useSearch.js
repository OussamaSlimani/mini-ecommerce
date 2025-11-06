// Importation du hook `useQuery` de React Query (TanStack Query)
// Il permet de gérer la récupération, le cache et la synchronisation des données côté client.
import { useQuery } from '@tanstack/react-query';

// Importation de la fonction API pour récupérer tous les produits
import { fetchAllProducts } from '../services/api';

// Importation des hooks React `useState` et `useMemo`
// - useState : pour gérer l’état local de la recherche
// - useMemo : pour mémoriser les résultats filtrés et éviter des recalculs inutiles
import { useState, useMemo } from 'react';

// Définition du hook personnalisé `useSearch`
// Ce hook gère la logique de recherche produit (filtrage côté client)
export const useSearch = (query = '') => {
  // État local pour stocker la requête de recherche de l’utilisateur
  const [searchQuery, setSearchQuery] = useState(query);

  // Récupération de tous les produits via React Query
  const { data: allProducts = [], isLoading } = useQuery({
    // Clé unique pour identifier cette requête dans le cache
    queryKey: ['products'],
    // Fonction qui appelle l’API pour obtenir les produits
    queryFn: fetchAllProducts,
    // Durée pendant laquelle les données sont considérées comme fraîches (10 minutes ici)
    staleTime: 1000 * 60 * 10, // 10 min
  });

  // Utilisation de useMemo pour filtrer les produits selon la recherche
  // La fonction ne se recalculera que si la liste des produits ou la requête change
  const filteredProducts = useMemo(() => {
    // Si aucun texte de recherche n’est saisi, on retourne tous les produits
    if (!searchQuery.trim()) return allProducts;

    // Mise en minuscule de la requête pour une recherche insensible à la casse
    const q = searchQuery.toLowerCase();

    // Filtrage des produits dont le nom contient la chaîne recherchée
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(q)
    );
  }, [allProducts, searchQuery]);

  // Le hook retourne les données et fonctions utiles à un composant de recherche
  return {
    products: filteredProducts,  // Liste des produits filtrés
    searchQuery,                 // Texte de recherche actuel
    setSearchQuery,              // Fonction pour mettre à jour le texte de recherche
    isLoading,                   // Indique si les données sont encore en chargement
    total: filteredProducts.length, // Nombre total de produits trouvés
  };
};
