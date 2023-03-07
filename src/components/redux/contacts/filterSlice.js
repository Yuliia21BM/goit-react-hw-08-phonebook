import { createSlice } from '@reduxjs/toolkit';

const initialValue = { value: '' };

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialValue,
  reducers: {
    chatngeFilterValue(state, action) {
      state.value = action.payload.toLocaleLowerCase();
    },
  },
});

export const { chatngeFilterValue } = filterSlice.actions;
