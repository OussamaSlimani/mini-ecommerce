export const fetchCategories = async () => {
  const response = await fetch('http://localhost:3000/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};

export const fetchTopSellers = async () => {
  const res = await fetch('http://localhost:3000/top-sellers-products');
  if (!res.ok) throw new Error('Failed to load top sellers');
  return res.json();
};

export const fetchTopNew = async () => {
  const res = await fetch('http://localhost:3000/top-new-products');
  if (!res.ok) throw new Error('Failed to load top new');
  return res.json();
};

export const fetchCategoryById = async (id) => {
  const res = await fetch(`http://localhost:3000/categories`);
  if (!res.ok) throw new Error('Failed to load categories');
  const categories = await res.json();
  const category = categories.find(c => c.id === id);
  if (!category) throw new Error('Category not found');
  return category;
};

export const fetchProductList = async (listId) => {
  const res = await fetch(`http://localhost:3000/products-lists/${listId}`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
};

export const fetchProduct = async (id) => {
  const res = await fetch(`http://localhost:3000/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};

export const fetchCarts = async () => {
  const res = await fetch('http://localhost:3000/carts');
  if (!res.ok) throw new Error('Failed to load carts');
  return res.json();
};

export const fetchCart = async (cartId) => {
  const res = await fetch(`http://localhost:3000/carts/${cartId}`);
  if (!res.ok) throw new Error('Failed to load cart');
  return res.json();
};

export const updateCart = async (cartId, cartData) => {
  const res = await fetch(`http://localhost:3000/carts/${cartId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartData),
  });
  if (!res.ok) throw new Error('Failed to update cart');
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
};

export const fetchAllProducts = async () => {
  const res = await fetch('http://localhost:3000/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};