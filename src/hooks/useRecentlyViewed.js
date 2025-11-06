// --- Importation des hooks React ---
import { useState, useEffect, useCallback } from 'react';

// --- Importation du gestionnaire de cookies ---
import Cookies from 'js-cookie';

// --- Constantes globales du hook ---
const COOKIE_NAME = 'recently-viewed'; // Nom du cookie stockant les produits consultés récemment
const MAX_ITEMS = 10;                  // Nombre maximum de produits à mémoriser

/**
 * Hook personnalisé : useRecentlyViewed
 * -------------------------------------
 * Gère la liste des produits récemment consultés à l’aide d’un cookie.
 * 
 * ✅ Fonctionnalités :
 * - Persiste les produits dans un cookie (`js-cookie`)
 * - Évite les doublons
 * - Limite le nombre d’éléments stockés (MAX_ITEMS)
 * - Charge automatiquement la liste au montage du composant
 * 
 * @returns {object} - { items, addItem }
 *  - items : tableau des produits consultés récemment
 *  - addItem : fonction pour ajouter un produit à la liste
 */
export const useRecentlyViewed = () => {
  // --- État local stockant les produits ---
  const [items, setItems] = useState([]);

  /**
   * Au montage du composant :
   * --------------------------
   * Charge les produits stockés dans le cookie `recently-viewed`
   * et les convertit en tableau JSON utilisable.
   */
  useEffect(() => {
    const saved = Cookies.get(COOKIE_NAME);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Vérifie que les données sont bien un tableau
        setItems(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('❌ Erreur lors du parsing du cookie recently-viewed', e);
        setItems([]);
      }
    }
  }, []);

  /**
   * Fonction pour ajouter un produit à la liste
   * --------------------------------------------
   * - Supprime les doublons (même ID)
   * - Ajoute le produit au début du tableau
   * - Tronque la liste si elle dépasse MAX_ITEMS
   * - Met à jour le cookie
   */
  const addItem = useCallback((product) => {
    if (!product?.id) return; // Vérifie qu’un produit valide est fourni

    setItems((prev) => {
      // Supprime le produit s’il est déjà présent
      const filtered = prev.filter(p => p.id !== product.id);

      // Ajoute le nouveau produit en tête
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);

      // Sauvegarde dans le cookie
      try {
        Cookies.set(COOKIE_NAME, JSON.stringify(updated), { expires: 30 }); // Cookie valable 30 jours
      } catch (e) {
        console.error('❌ Échec de la sauvegarde du cookie recently-viewed', e);
      }

      return updated;
    });
  }, []);

  // --- Retourne les produits et la fonction pour en ajouter ---
  return { items, addItem };
};
