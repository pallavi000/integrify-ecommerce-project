import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { orderPersistConfig } from "../../utils/reduxPersistConfig";

// types
import { OrderState } from "../../@types/reduxState";
import { TOrder } from "../../@types/order";

// initail state
const initialState: OrderState = {
  data: [],
  isLoading: false,
  error: null,
};

// slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrder>) => {
      return {
        ...state,
        data: [action.payload, ...state.data],
        isLoading: false,
        error: null,
      };
    },
  },
});

// actions
export const { addOrder } = orderSlice.actions;
// redux persist reducer
export default persistReducer(orderPersistConfig, orderSlice.reducer);
