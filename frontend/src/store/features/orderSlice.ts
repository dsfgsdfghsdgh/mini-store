import { getOrdersRequest } from "@/common/lib/apiEndpoint";
import { OrderTypes } from "@/common/types/types";
import API from "@/config/apiConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const orderService = createAsyncThunk("order/process", async () => {
  try {
    const response = await API.get(getOrdersRequest);
    if (response.data?.success === false) {
      toast.error("order not found");
      return;
    }
    return response.data.data; // Success
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error.message || "error in getting orders");
  }
});

type InitialStateType = {
  data: OrderTypes[] | [];
  isLoading: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  data: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    nothingJustFun: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(orderService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload || [];
      })
      .addCase(orderService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export const { nothingJustFun } = orderSlice.actions;

const orderReducer = orderSlice.reducer;

export default orderReducer;
