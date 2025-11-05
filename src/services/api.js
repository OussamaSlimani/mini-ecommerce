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