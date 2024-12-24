import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../helpers/cart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const item = action.payload;

      // const existItem = state.cartItems.find((x) => item._id === x._id);

      // if (existItem) {
      //   state.cartItems = state.cartItems.map((x) =>
      //     x._id === existItem._id ? item : x
      //   );
      // } else {
      //   state.cartItems = [...state.cartItems, item];
      // }
      state.cartItems = { ...item };

      return updateCart(state);
    },

    removefromcart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      return updateCart(state);
    },

    clearcart: (state, action) => {
      state.cartItems = {};
      return updateCart(state);
    },
    saveUserDetails: (state, action) => {
      state.userDetails = action.payload;
      return updateCart(state);
    },
  },
});

export const { addTocart, removefromcart, clearcart, saveUserDetails } =
  cartSlice.actions;

export default cartSlice.reducer;
