import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  LoginSuccessNot,
  LoginErrorNot,
  SignUpSuccessNot,
  SignUErrorNot,
  LogOutSuccessNot,
  LogOutErrorNot,
} from 'components/utiles';

axios.defaults.baseURL = 'https://goit-task-manager.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials);
      const { data } = await axios.post('/users/signup', credentials);
      token.set(data.token);
      SignUpSuccessNot();
      return data;
    } catch (error) {
      SignUErrorNot();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials);
      const { data } = await axios.post('/users/login', credentials);
      token.set(data.token);
      LoginSuccessNot();
      console.log(data);
      return data;
    } catch (error) {
      LoginErrorNot();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      token.unset();
      LogOutSuccessNot();
    } catch (error) {
      LogOutErrorNot();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) return thunkAPI.rejectWithValue();

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
