import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NAME = 'recently-viewed';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = Cookies.get(COOKIE_NAME);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error('Failed to parse recently viewed cookie', e);
        setItems([]);
      }
    }
  }, []);

  const addItem = useCallback((product) => {
    if (!product?.id) return;

    setItems((prev) => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      
      try {
        Cookies.set(COOKIE_NAME, JSON.stringify(updated), { expires: 30 });
      } catch (e) {
        console.error('Failed to save recently viewed', e);
      }
      
      return updated;
    });
  }, []); 

  return { items, addItem };
};