// -------------------------
// FONCTIONS D'API
// -------------------------

/**
 * Récupère toutes les catégories depuis l'API.
 * @returns {Promise<Array>} Liste des catégories
 * @throws Erreur si la requête échoue
 */
export const fetchCategories = async () => {
  const response = await fetch('http://localhost:3000/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

/**
 * Récupère les produits les plus vendus.
 * @returns {Promise<Array>} Liste des top sellers
 * @throws Erreur si la requête échoue
 */
export const fetchTopSellers = async () => {
  const res = await fetch('http://localhost:3000/top-sellers-products');
  if (!res.ok) throw new Error('Failed to load top sellers');
  return res.json();
};

/**
 * Récupère les produits les plus récents.
 * @returns {Promise<Array>} Liste des top new products
 * @throws Erreur si la requête échoue
 */
export const fetchTopNew = async () => {
  const res = await fetch('http://localhost:3000/top-new-products');
  if (!res.ok) throw new Error('Failed to load top new');
  return res.json();
};

/**
 * Récupère une catégorie spécifique par son ID.
 * @param {number|string} id - ID de la catégorie
 * @returns {Promise<Object>} Catégorie correspondante
 * @throws Erreur si la catégorie n'existe pas ou la requête échoue
 */
export const fetchCategoryById = async (id) => {
  const res = await fetch(`http://localhost:3000/categories`);
  if (!res.ok) throw new Error('Failed to load categories');
  const categories = await res.json();
  const category = categories.find(c => c.id === id);
  if (!category) throw new Error('Category not found');
  return category;
};

/**
 * Récupère la liste des produits pour un identifiant de liste donné.
 * @param {number|string} listId - ID de la liste de produits
 * @returns {Promise<Array>} Liste des produits
 * @throws Erreur si la requête échoue
 */
export const fetchProductList = async (listId) => {
  const res = await fetch(`http://localhost:3000/products-lists/${listId}`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
};

/**
 * Récupère un produit spécifique par son ID.
 * @param {number|string} id - ID du produit
 * @returns {Promise<Object>} Produit correspondant
 * @throws Erreur si le produit n'existe pas ou la requête échoue
 */
export const fetchProduct = async (id) => {
  const res = await fetch(`http://localhost:3000/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};

/**
 * Récupère tous les paniers.
 * @returns {Promise<Array>} Liste des paniers
 * @throws Erreur si la requête échoue
 */
export const fetchCarts = async () => {
  const res = await fetch('http://localhost:3000/carts');
  if (!res.ok) throw new Error('Failed to load carts');
  return res.json();
};

/**
 * Récupère un panier spécifique par son ID.
 * @param {number|string} cartId - ID du panier
 * @returns {Promise<Object>} Panier correspondant
 * @throws Erreur si le panier n'existe pas ou la requête échoue
 */
export const fetchCart = async (cartId) => {
  const res = await fetch(`http://localhost:3000/carts/${cartId}`);
  if (!res.ok) throw new Error('Failed to load cart');
  return res.json();
};

/**
 * Met à jour un panier existant.
 * @param {number|string} cartId - ID du panier
 * @param {Object} cartData - Données du panier mises à jour
 * @returns {Promise<Object>} Panier mis à jour
 * @throws Erreur si la requête échoue
 */
export const updateCart = async (cartId, cartData) => {
  const res = await fetch(`http://localhost:3000/carts/${cartId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartData),
  });
  if (!res.ok) throw new Error('Failed to update cart');
  return res.json();
};

/**
 * Crée une nouvelle commande.
 * @param {Object} orderData - Données de la commande
 * @returns {Promise<Object>} Commande créée
 * @throws Erreur si la requête échoue
 */
export const createOrder = async (orderData) => {
  const res = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
};

/**
 * Récupère tous les produits.
 * @returns {Promise<Array>} Liste des produits
 * @throws Erreur si la requête échoue
 */
export const fetchAllProducts = async () => {
  const res = await fetch('http://localhost:3000/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};
