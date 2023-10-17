import React from "react";
import { TUser, TUserRole } from "./user";

type Keys =
  | "HOME"
  | "SIGN_IN"
  | "REGISTER"
  | "PRODUCTS"
  | "PRODUCT_DETAIL"
  | "CATEGORY_PRODUCTS"
  | "SEARCH"
  | "CART"
  | "CHECKOUT"
  | "ACCOUNT_PAGE"
  | "ORDER_SUCCESS"
  | "ADMIN_DASHBOARD"
  | "ADMIN_USERS"
  | "ADMIN_CATEGORIES"
  | "ADMIN_PRODUCTS"
  | "ADMIN_ORDERS"
  | "ADMIN_PROFILE"
  | "NOT_FOUND";

type Path =
  | "/"
  | "/sign-in"
  | "/register"
  | "/products"
  | "/product-detail/:id"
  | "/search"
  | "/category/:id/products"
  | "/cart"
  | "/checkout"
  | "/account/:page?"
  | "/order-success/:orderId"
  | "/admin/dashboard"
  | "/admin/users"
  | "/admin/products"
  | "/admin/categories"
  | "/admin/orders"
  | "/admin/profile"
  | "*";

export type TROUTES = {
  [key in Keys]: Path;
};

export type Routers = {
  path: Path;
  Component: React.FC;
  role: "public" | TUserRole;
};

export type TRouteProps = {
  Component: React.FC;
  userRole: "public" | TUserRole | null;
};
