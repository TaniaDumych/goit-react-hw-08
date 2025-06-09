import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};


export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/signup', credentials);
    const token = res.data.token;

    localStorage.setItem('token', token);

    setAuthHeader(token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/login', credentials);
    const token = res.data.token;

   
    localStorage.setItem('token', token);

    setAuthHeader(token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();

  
    localStorage.removeItem('token');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});


export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue('No token found');
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get('/users/current');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
