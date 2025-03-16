import API from "@/config/apiConfig";
import { registerUserRequest } from "@/common/lib/apiEndpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: object | null;
  error: string | null;
};

const initialState: InitialStateType = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

type UserRegisterType = {
  email: string;
  password: string;
  name: string;
};

export const registerUser = createAsyncThunk(
  "registerUser/data",

  async (formData: UserRegisterType) => {
    try {
      const response = await API.post(registerUserRequest, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("User registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        console.log("action", action);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "error in user registration";
        console.log("action", action);
      });
  },
});

export const { setUser } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
