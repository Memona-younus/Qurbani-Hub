// redux/reducers/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null, // Initial state is set to null, meaning no user is logged in initially
  reducers: {
    loginUser: (state, action) => {
      // Update the state with user information after login
      return action.payload;
    },
    logoutUser: (state) => {
      // Clear user information from the state after logout
      return null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
