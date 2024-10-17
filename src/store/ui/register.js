import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    email: '',
    password: '',
    role: 'User',
  },
  allowedRoles: [
    {
      key: 'User',
      label: 'User',
    },
    {
      key: 'Seller',
      label: 'Seller',
    },
  ],
};

export const slice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = slice.actions;

export default slice.reducer;
