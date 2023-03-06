import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  token: '',
  user: { name: '', email: '' },
  isLoggedIn: false,
  isRefreshing: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setisRefresh(state, action) {
      state.isRefreshing = action.payload;
    },
  },
});

export const { setToken, setUser, setLoggedIn, setisRefresh } =
  authSlice.actions;
