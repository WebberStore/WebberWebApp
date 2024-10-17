import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';

const initialState = {
  formData: {
    name: '',
    description: '',
    categoryId: '',
    price: 0,
    imageUrl: '',
  },
  filters: [
    { key: 'name', label: 'Name' },
  ],
  sorts: [
    {
      key: 'selling_price',
      label: 'Sort by price',
      direction: 0,
    },
    {
      key: 'stock',
      label: 'Sort by availability',
      direction: 0,
    },
  ],
};

export const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = pick(action.payload, ['name', 'description', 'categoryId', 'price', 'imageUrl']);
    },
  },
});

export const { setFormData } = slice.actions;

export default slice.reducer;
