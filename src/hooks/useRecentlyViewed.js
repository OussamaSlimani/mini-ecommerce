import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'recently-viewed';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = Cookies.get(COOKIE_NAME);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        setItems([]);
      }
    }
  }, []);

  const addItem = (product) => {
    setItems((prev) => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      Cookies.set(COOKIE_NAME, JSON.stringify(updated), { expires: 30 });
      return updated;
    });
  };

  return { items, addItem };
};