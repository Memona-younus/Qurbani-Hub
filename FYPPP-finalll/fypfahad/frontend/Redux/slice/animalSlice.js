// redux/reducers/animalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const animalSlice = createSlice({
  name: 'animal',
  initialState: {
    animals: [], // An array to store cart items
   
  },
  reducers: {
    gettingAnimal: (state, action) => {
        state.animals = action.payload;
    },
  
  },
});

export const { gettingAnimal } = animalSlice.actions;
export default animalSlice.reducer;
