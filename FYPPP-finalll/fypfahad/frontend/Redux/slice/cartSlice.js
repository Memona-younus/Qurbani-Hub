// redux/reducers/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // An array to store cart items
    totalPrice: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      console.log(action.payload,'payload-------------------------')

      const isItemInCart = state.items.some(item => item._id == newItem._id);
      console.log(isItemInCart,'isItemInCart')
      if (!isItemInCart) {
        state.items.push(newItem);
        state.totalPrice += newItem.price; // Use newItem instead of action.payload
      }
    },
    removeItemFromCart: (state, action) => {
      const removedItem = state.items.find(item => item._id === action.payload._id);

      if (removedItem) {
        state.totalPrice -= removedItem.price; 
        state.items = state.items.filter(item => item._id != action.payload._id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
