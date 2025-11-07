export const API_BASE_URL = 'http://localhost:3000';

// Fetch helper function
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;

  return response.json();
};


// Requests 
export const fetchCategories = async () => {
  return apiFetch('/categories');
};

export const fetchCategoryById = async (id) => {
  return apiFetch(`/categories/${id}`);
};

export const fetchTopSellers = async () => {
  return apiFetch('/top-sellers-products');
};

export const fetchTopNew = async () => {
  return apiFetch('/top-new-products');
};

export const fetchProductList = async (listId) => {
  return apiFetch(`/products-lists/${listId}`);
};

export const fetchProduct = async (id) => {
  return apiFetch(`/products/${id}`);
};

export const fetchAllProducts = async () => {
  return apiFetch('/products');
};

export const fetchCarts = async () => {
  return apiFetch('/carts');
};

export const fetchCart = async (cartId) => {
  return apiFetch(`/carts/${cartId}`);
};

export const updateCart = async (cartId, cartData) => {
  return apiFetch(`/carts/${cartId}`, {
    method: 'PUT',
    body: JSON.stringify(cartData),
  });
};

export const createOrder = async (orderData) => {
  return apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};