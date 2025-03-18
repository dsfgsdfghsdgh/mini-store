import { ProductProps } from "@/common/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CartState {
  cartProducts: ProductProps[];
}

const initialState: CartState = {
  cartProducts: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductProps>) => {
      const existing = state.cartProducts.find((p) => p._id === action.payload._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    DecQuantityByOne : (state, action: PayloadAction<ProductProps>)=>{
      const existing = state.cartProducts.find((p) => p._id === action.payload._id);
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    removeFromCart: (state, action: PayloadAction<ProductProps>) => {
      const index = state.cartProducts.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.cartProducts.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    resetCart: (state) => {
      state.cartProducts = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, resetCart,DecQuantityByOne,removeFromCart } = cartSlice.actions;
const cartReducer= cartSlice.reducer;

export default cartReducer;
