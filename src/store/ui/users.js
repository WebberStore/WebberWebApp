import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'mobile',
      label: 'Mobile',
    },
    {
      key: 'role',
      label: 'Role',
      options: [
        {
          key: 'Admin',
          label: 'Admin',
        },
        {
          key: 'User',
          label: 'User',
        },
        {
          key: 'Seller',
          label: 'Seller',
        },
      ],
    },
  ],
  sorts: [
    {
      key: 'name',
      label: 'Sort by name',
      direction: 0,
    },
    {
      key: 'created_at',
      label: 'Sort by registration date',
      direction: 0,
    },
  ],
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default slice.reducer;
