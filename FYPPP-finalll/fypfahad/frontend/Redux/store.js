import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import cartReducer from './slice/cartSlice'; // Import the cart reducer
import animalReducer from './slice/animalSlice'; // Import the cart reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer, 
    animal: animalReducer, 
  },
});

export default store;