import { ProductProps } from "@/common/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  favoriteProducts: ProductProps[];
}

const initialState: FavoriteState = {
  favoriteProducts: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<ProductProps>) => {
      const exists = state.favoriteProducts.some(
        (p) => p._id === action.payload._id
      );
      if (!exists) {
        state.favoriteProducts.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favoriteProducts));
    },
    removeFromFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (p) => p._id !== Number(action.payload)
      );
      localStorage.setItem("favorites", JSON.stringify(state.favoriteProducts));
    },
    resetFavorite: (state) => {
      state.favoriteProducts = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addToFavorite, removeFromFavorite, resetFavorite } =
  favoriteSlice.actions;
const favoriteReducer= favoriteSlice.reducer;

export default favoriteReducer;
