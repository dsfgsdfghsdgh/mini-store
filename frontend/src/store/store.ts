import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./features/cartSlice";
import favoriteReducer from "./features/favoriteSlice";
import checkoutReducer from "./features/checkoutSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
