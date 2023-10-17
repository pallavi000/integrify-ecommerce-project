import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import axiosInstance from "../../utils/AxiosInstance";
import { AxiosError } from "axios";

// types
import { CategoryState } from "../../@types/reduxState";
import { TCategory } from "../../@types/category";
import { TProduct } from "../../@types/product";

// initial states
const initialState: CategoryState = {
  data: null,
  products: [],
  isLoading: false,
  error: null,
};

// slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TCategory>) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsByCategory.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      fetchProductsByCategory.fulfilled,
      (state, action: PayloadAction<TProduct[]>) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          products: action.payload,
        };
      }
    );
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
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
export const fetchProductsByCategory = createAsyncThunk(
  "fetchProductsByCategory",
  async ({
    id,
    offset,
    limit,
    price_min,
    price_max,
    categoryId,
  }: {
    id: number;
    offset: number;
    limit: number;
    price_min: number;
    price_max: number;
    categoryId: number;
  }) => {
    try {
      const result = await axiosInstance.get(
        `/products?offset=${offset}&limit=${limit}&price_min=${price_min}&price_max=${price_max}&categoryId=${id}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw error;
    }
  }
);

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
