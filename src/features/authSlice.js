import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { API } from '../api';

const initialState = {
  authData: null,
};

export const signIn = createAsyncThunk('auth/signIn', async formData => {
  try {
    const { data } = await API.post(`/user/signin`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async formData => {
  try {
    const { data } = await API.post(`/user/signup`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      const { token, result } = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...result, token }));

      return { ...state, authData: action.payload };
    },

    [signUp.fulfilled]: (state, action) => {
      const { token, result } = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...result, token }));

      return { ...state, authData: action.payload };
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
