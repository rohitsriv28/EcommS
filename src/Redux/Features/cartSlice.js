import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, img, productName, offerPrice, sellingPrice } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({
          id,
          img,
          productName,
          offerPrice,
          sellingPrice,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
