export const API_BASE_URL = "http://localhost:3000";

// Fetch helper function
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = new Error(
      `Failed to fetch: ${response.status} ${response.statusText}`
    );
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;

  return response.json();
};

// Récupérer toutes les catégories
export const fetchCategories = async () => {
  return apiFetch("/categories");
};

// Récupérer une catégorie par ID
export const fetchCategoryById = async (id) => {
  return apiFetch(`/categories/${id}`);
};

// Récupérer les produits les plus vendus
export const fetchTopSellers = async () => {
  return apiFetch("/top-sellers-products");
};

// Récupérer les nouveaux produits
export const fetchTopNew = async () => {
  return apiFetch("/top-new-products");
};

// Récupérer une liste de produits par ID de liste
export const fetchProductList = async (listId) => {
  return apiFetch(`/products-lists/${listId}`);
};

// Récupérer un produit par ID
export const fetchProduct = async (id) => {
  return apiFetch(`/products/${id}`);
};

// Récupérer tous les produits
export const fetchAllProducts = async () => {
  return apiFetch("/products");
};

// Récupérer tous les paniers
export const fetchCarts = async () => {
  return apiFetch("/carts");
};

// Récupérer un panier par ID
export const fetchCart = async (cartId) => {
  return apiFetch(`/carts/${cartId}`);
};

// Mettre à jour un panier
export const updateCart = async (cartId, cartData) => {
  return apiFetch(`/carts/${cartId}`, {
    method: "PUT",
    body: JSON.stringify(cartData),
  });
};

// Créer une nouvelle commande
export const createOrder = async (orderData) => {
  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};
