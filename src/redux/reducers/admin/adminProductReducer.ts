import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/AxiosInstance";

// types
import { ProductsState } from "../../../@types/reduxState";
import { ProductInputsData } from "../../../@types/product";

// helpers
import { showApiErrorToastr, showCustomToastr } from "../../../utils/helper";

// initial states
const initialState: ProductsState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminAllProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAdminAllProducts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchAdminAllProducts.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(addNewProduct.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: [action.payload, ...state.data],
      };
    });
    builder.addCase(addNewProduct.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(updateAdminProduct.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(updateAdminProduct.fulfilled, (state, action) => {
      const productIndex = state.data.findIndex(
        (c) => c.id === action.payload.id
      );
      if (productIndex !== -1) {
        state.data[productIndex] = action.payload;
      }
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updateAdminProduct.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(deleteAdminProduct.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(deleteAdminProduct.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: state.data.filter((cat) => cat.id !== action.payload),
      };
    });
    builder.addCase(deleteAdminProduct.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });
  },
});

// ==============================================
// API Calls
// ==============================================
export const addNewProduct = createAsyncThunk(
  "addNewProduct",
  async (data: ProductInputsData) => {
    try {
      const response = await axiosInstance.post(`/products`, data);
      showCustomToastr("Product created successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const fetchAdminAllProducts = createAsyncThunk(
  "fetchAdminAllProducts",
  async () => {
    try {
      const result = await axiosInstance.get(`/products`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const updateAdminProduct = createAsyncThunk(
  "updateAdminProduct",
  async (data: ProductInputsData) => {
    try {
      const response = await axiosInstance.put(`/products/${data.id}`, data);
      showCustomToastr("Product updated successfully.", "success");
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const deleteAdminProduct = createAsyncThunk(
  "deleteAdminProduct",
  async ({ id }: { id: number }) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      showCustomToastr("Product removed successfully.", "success");
      return id;
    } catch (e) {
      const error = e as AxiosError;
      showApiErrorToastr(error);
      throw error;
    }
  }
);

export const {} = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
