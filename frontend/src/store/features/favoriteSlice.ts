import { ProductProps } from "@/common/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favoriteProducts: ProductProps[];
}

const initialState: FavoriteState = {
  favoriteProducts: JSON.parse(localStorage.getItem("favorite") || "[]"),
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<ProductProps>) => {
      const existing = state.favoriteProducts.find(
        (p) => p._id === action.payload._id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.favoriteProducts.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("favorite", JSON.stringify(state.favoriteProducts));
    },
    DecQuantityByOne: (state, action: PayloadAction<ProductProps>) => {
      const existing = state.favoriteProducts.find(
        (p) => p._id === action.payload._id
      );
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      }
      localStorage.setItem("favorite", JSON.stringify(state.favoriteProducts));
    },
    removeFromFavorite: (state, action: PayloadAction<ProductProps>) => {
      const index = state.favoriteProducts.findIndex(
        (p) => p._id === action.payload._id
      );
      if (index !== -1) {
        state.favoriteProducts.splice(index, 1);
      }
      localStorage.setItem("favorite", JSON.stringify(state.favoriteProducts));
    },
    resetFavorite: (state) => {
      state.favoriteProducts = [];
      localStorage.removeItem("favorite");
    },
  },
});

export const {
  addToFavorite,
  resetFavorite,
  DecQuantityByOne,
  removeFromFavorite,
} = favoriteSlice.actions;
const favoriteReducer = favoriteSlice.reducer;

export default favoriteReducer;
