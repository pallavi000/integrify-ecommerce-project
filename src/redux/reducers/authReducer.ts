import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { authPersistConfig } from "../../utils/reduxPersistConfig";

// App state
import { AppState } from "../store";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../utils/AxiosInstance";

// types
import { AuthState } from "../../@types/reduxState";
import { RegisterInputs } from "../../@types/user";

// helper
import { showApiErrorToastr, showCustomToastr } from "../../utils/helper";

// initial states
const initialState: AuthState = {
  user: null,
  error: null,
  isLoading: false,
  access_token: null,
  refresh_token: null,
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        user: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        error: null,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,

        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,

        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(getCurrentUser.pending, (state, action) => {
      return {
        ...state,

        isLoading: true,
        error: null,
      };
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      return {
        ...state,

        user: action.payload,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      return {
        ...state,
        access_token: null,
        refresh_token: null,

        isLoading: false,
        error: null,
      };
    });
  },
});

// ==============================================
// API Calls
// ==============================================
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      showCustomToastr("Login successfull.", "success");
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (data: RegisterInputs) => {
    try {
      const result = await axiosInstance.post("/users", data);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_, { getState }) => {
    try {
      const state = getState() as AppState;
      const accessToken = state.auth.access_token;
      if (!accessToken) {
        throw new Error("No access token available");
      }
      const result = await axiosInstance.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { password, ...userData } = result.data;
      return userData;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const { logoutUser } = authSlice.actions;
export default persistReducer(authPersistConfig, authSlice.reducer);
