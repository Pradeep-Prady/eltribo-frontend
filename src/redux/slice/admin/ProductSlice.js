import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: 'ProductSlice',
  initialState: { id: null, userProd: null, contactId: null, isAdmin: false },
  reducers: {
    prodSet: (state, action) => {
      state.id = action.payload.id;
      state.isAdmin = action.payload.isAdmin || false; // Set isAdmin to true if available in payload
    },
    userProdSet: (state, action) => {
      state.userProd = action.payload;
    },
    contactSet: (state, action) => {
      state.contactId = action.payload;
    },
    categorySet: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { prodSet, userProdSet, contactSet, categorySet } = ProductSlice.actions;
export default ProductSlice.reducer;

 