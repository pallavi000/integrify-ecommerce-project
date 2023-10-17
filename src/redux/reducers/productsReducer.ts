import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// types
import { ProductsState } from "../../@types/reduxState";

// axios
import { AxiosError } from "axios";
import axiosInstance from "../../utils/AxiosInstance";

// initial state
const initialState: ProductsState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(fetchFilterProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchFilterProducts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchFilterProducts.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message || "",
      };
    });

    builder.addCase(fetchSearchProducts.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    });
    builder.addCase(fetchSearchProducts.rejected, (state, action) => {
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
export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async ({ offset, limit }: { offset: number; limit: number }) => {
    try {
      const result = await axiosInstance.get(
        `/products?offset=${offset}&limit=${limit}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const fetchFilterProducts = createAsyncThunk(
  "fetchFilterProducts",
  async ({
    offset,
    limit,
    price_min,
    price_max,
    categoryId,
  }: {
    offset: number;
    limit: number;
    price_min: number;
    price_max: number;
    categoryId: number;
  }) => {
    try {
      const result = await axiosInstance.get(
        `/products?offset=${offset}&limit=${limit}&price_min=${price_min}&price_max=${price_max}&categoryId=${categoryId}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "fetchSearchProducts",
  async ({
    query,
    price_min,
    price_max,
    categoryId,
  }: {
    query: string;
    price_min: number;
    price_max: number;
    categoryId: number;
  }) => {
    try {
      let url;
      if (categoryId) {
        url = `/products/?title=${query}&price_min=${price_min}&price_max=${price_max}&categoryId=${categoryId}`;
      } else {
        url = `/products/?title=${query}&price_min=${price_min}&price_max=${price_max}`;
      }
      const result = await axiosInstance.get(url);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const {} = productsSlice.actions;

export default productsSlice.reducer;
