import { getProductRequest } from "@/common/lib/apiEndpoint";
import { ProductProps } from "@/common/types/types";
import API from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const productService = createAsyncThunk("product/process", async () => {
  try {
    const response = await API.get(getProductRequest);
    if (response.data?.success === false) {
      return;
    }
    return response.data.data; // Success
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || "error in getting products");
  }
});

type InitialStateType = {
  data: ProductProps[] | [];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  data: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    nothingJustFun: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(productService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload || [];
      })
      .addCase(productService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export const { nothingJustFun } = productSlice.actions;

const productReducer = productSlice.reducer;

export default productReducer;
