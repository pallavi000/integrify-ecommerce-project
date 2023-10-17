import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

// Reducers
import productsReducer from "./reducers/productsReducer";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import categoryReducer from "./reducers/categoryReducer";
import orderReducer from "./reducers/orderReducer";
// Admin Reducers
import adminUserReducer from "./reducers/admin/adminUserReducer";
import adminProductReducer from "./reducers/admin/adminProductReducer";
import adminCategoryReducer from "./reducers/admin/adminCategoryReducer";

// Redux Store
const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,

    adminUsers: adminUserReducer,
    adminProducts: adminProductReducer,
    adminCategories: adminCategoryReducer,
  },
  middleware: (getDEfaultMiddleware) =>
    getDEfaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

// Redux Persistor
export const persistor = persistStore(store);

// App State
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// App Dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
