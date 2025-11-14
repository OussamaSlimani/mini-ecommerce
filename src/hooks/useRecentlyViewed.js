import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

const COOKIE_NAME = "recently-viewed";
const MAX_RECENTLY_VIEWED_ITEMS = 10;

const normalizeProduct = (product) => ({
  id: String(product.id),
  name: String(product.name),
  imageName: product.imageName || null,
  price: Number(product.price) || 0,
  discountRate: Number(product.discountRate) || 0,
  review: Number(product.review) || 0,
});

export const useRecentlyViewed = () => {
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);

  useEffect(() => {
    const savedItems = Cookies.get(COOKIE_NAME);
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setRecentlyViewedItems(Array.isArray(parsedItems) ? parsedItems : []);
      } catch (error) {
        setRecentlyViewedItems([]);
        console.error(
          "Failed to parse recently viewed items from cookie",
          error
        );
      }
    }
  }, []);

  const addRecentlyViewedItem = useCallback((product) => {
    if (!product?.id) {
      return;
    }

    const normalizedProduct = normalizeProduct(product);

    setRecentlyViewedItems((previousItems) => {
      // Remove any existing item with same id
      const filteredItems = previousItems.filter(
        (item) => item.id !== normalizedProduct.id
      );

      // Add new item at front
      const updatedItems = [normalizedProduct, ...filteredItems].slice(
        0,
        MAX_RECENTLY_VIEWED_ITEMS
      );

      try {
        Cookies.set(COOKIE_NAME, JSON.stringify(updatedItems), { expires: 30 });
        // console.log("Successfully saved recently viewed items to cookie");
      } catch (error) {
        console.error("Failed to save recently viewed items", error);
      }

      return updatedItems;
    });
  }, []);

  return { recentlyViewedItems, addRecentlyViewedItem };
};
