import { checkoutServiceRequest } from "@/common/lib/apiEndpoint";
import { ProductProps } from "@/common/types/types";
import API from "@/config/apiConfig";
import stripe from "@/config/stripe";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkoutService = createAsyncThunk(
  "checkout/process",
  async (
    { products, email }: { products: ProductProps[]; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await API.post(checkoutServiceRequest, {
        products,
        email,
      });
      const data = response.data;

      const result = await stripe?.redirectToCheckout({
        sessionId: data.data.stripeSessionId,
      });

      if (result?.error) {
        return rejectWithValue(result.error.message);
      }

      return data; // Success
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Checkout failed"
      );
    }
  }
);

type InitialStateType = {
  products: ProductProps[] | [];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  products: [],
  isLoading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    nothingJustFun: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(checkoutService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkoutService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(checkoutService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export const { nothingJustFun } = checkoutSlice.actions;

const checkoutReducer = checkoutSlice.reducer;

export default checkoutReducer;
