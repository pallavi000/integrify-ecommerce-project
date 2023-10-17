import { TProduct } from "./product";

export type TCart = {
  product: TProduct;
  quantity: number;
  userId: number;
};
