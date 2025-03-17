import API from "@/config/apiConfig";
import { loginUserRequest, registerUserRequest } from "@/common/lib/apiEndpoint";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: object | null;
  error: string | null;
};

const initialState: InitialStateType = {
  isAuthenticated: false,
  isLoading: false,
  user: null, 
  error: null,
};

type UserRegisterType = {
  email: string;
  password: string;
  avatar: File | null;
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


export const loginUser = createAsyncThunk(
  "loginUser/data",
  async (formData: { email: string; password: string }) => {
    try {
      const response = await API.post(loginUserRequest, formData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("User login failed");
    }
  }
)


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
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("action", action);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "error in user registration";
        console.log("action", action);
      })
      .addCase(loginUser.pending, (state) =>{
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state , action)=>{
        
        console.log("action", action);
        state.isLoading= false;
        state.user = action.payload.data
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || "error in user login";
        console.log("action", action);
      })
      
  }
});

export const { setUser } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
