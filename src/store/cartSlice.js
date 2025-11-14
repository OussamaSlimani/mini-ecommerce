import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCart, createCart, updateCart } from '../services/api';

const CART_ID_KEY = 'cartId';

// Async Thunks
export const initializeCart = createAsyncThunk(
  'cart/initialize',
  async (_, { rejectWithValue }) => {
    try {
      let cartId = localStorage.getItem(CART_ID_KEY);

      if (cartId) {
        // Fetch existing cart
        const cart = await fetchCart(cartId);
        return { cart, cartId };
      } else {
        // Create new cart
        const newCart = await createCart();
        cartId = newCart.id;
        localStorage.setItem(CART_ID_KEY, cartId);
        return { cart: newCart, cartId };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/update',
  async ({ cartId, cartData }, { rejectWithValue }) => {
    try {
      const updatedCart = await updateCart(cartId, cartData);
      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    cartId: null,
    isLoading: false,
    isUpdating: false,
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.cart = null;
      state.cartId = null;
      localStorage.removeItem(CART_ID_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize Cart
      .addCase(initializeCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
        state.cartId = action.payload.cartId;
      })
      .addCase(initializeCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Cart
      .addCase(updateCartAsync.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.cart = action.payload;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      });
  },
});

// Helper to calculate cart totals
const calculateTotals = (items) => {
  const subTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subTotal * 0.20; // 20%
  const total = subTotal + tax;
  return { subTotal, tax, total };
};

// Thunk to add product
export const addProductToCart = (product, qty) => async (dispatch, getState) => {
  const { cart, cartId } = getState().cart;
  const existingItem = cart.items.find((i) => i.id === product.id);

  let newItems;
  if (existingItem) {
    newItems = cart.items.map((i) =>
      i.id === product.id ? { ...i, qty: i.qty + qty } : i
    );
  } else {
    newItems = [...cart.items, { ...product, qty }];
  }

  const { subTotal, tax, total } = calculateTotals(newItems);
  const updatedCart = { ...cart, items: newItems, subTotal, tax, total };

  dispatch(updateCartAsync({ cartId, cartData: updatedCart }));
};

// Thunk to update quantity
export const updateProductQuantity = (productId, newQty) => async (dispatch, getState) => {
  const { cart, cartId } = getState().cart;
  if (newQty < 1) return;

  const newItems = cart.items.map((i) =>
    i.id === productId ? { ...i, qty: newQty } : i
  );

  const { subTotal, tax, total } = calculateTotals(newItems);
  const updatedCart = { ...cart, items: newItems, subTotal, tax, total };

  dispatch(updateCartAsync({ cartId, cartData: updatedCart }));
};

// Thunk to remove product
export const removeProductFromCart = (productId) => async (dispatch, getState) => {
  const { cart, cartId } = getState().cart;

  const newItems = cart.items.filter((i) => i.id !== productId);
  const { subTotal, tax, total } = calculateTotals(newItems);
  const updatedCart = { ...cart, items: newItems, subTotal, tax, total };

  dispatch(updateCartAsync({ cartId, cartData: updatedCart }));
};

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;