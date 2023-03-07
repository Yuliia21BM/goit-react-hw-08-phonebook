import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logOutUser,
  refreshUser,
  signupUser,
} from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshingUser: false,
};

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   extraReducers: builder => {
//     builder
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//       })
//       .addCase(logOutUser.pending, state => {
//         state.isLoggedIn = false;
//       })
//       .addCase(logOutUser.fulfilled, state => {
//         state.user = { name: null, email: null };
//         state.token = null;
//         state.isLoggedIn = false;
//       })
//       .addCase(logOutUser.rejected, state => {
//         state.isLoggedIn = true;
//       })
//       .addCase(refreshUser.pending, state => {
//         state.isRefreshingUser = true;
//       })
//       .addCase(refreshUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isLoggedIn = true;
//         state.isRefreshingUser = false;
//       })
//       .addCase(refreshUser.rejected, state => {
//         state.isRefreshingUser = false;
//       });
//   },
// });

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logOutUser.pending]: state => {
      state.isLoggedIn = false;
    },
    [logOutUser.fulfilled]: state => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [logOutUser.rejected]: state => {
      state.isLoggedIn = true;
    },
    [refreshUser.pending]: state => {
      state.isRefreshingUser = true;
    },
    [refreshUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshingUser = false;
    },
    [refreshUser.rejected]: state => {
      state.isRefreshingUser = false;
    },
  },
});
