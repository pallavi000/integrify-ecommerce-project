import { TCart } from "./cart";
import { TProduct } from "./product";

export type TOrder = {
  orderId: string;
  total: number;
  orderDate: string;
  paymentMethod: string;
  items: TCart[];
  deliveryStatus: string;
};
