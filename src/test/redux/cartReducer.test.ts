import { TCart } from "../../@types/cart";
import cartReducer, {
  addToCart,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeFromCart,
} from "../../redux/reducers/cartReducer";
import store from "../../redux/store";
import { productsData } from "../testData/productData";
import { userData } from "../testData/userData";

describe("cart reducers", () => {
  // init test
  test("cart init test", () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      shippingId: null,
      isLoading: false,
      error: null,
    });
  });
  test("should add item to cart", () => {
    const cartItem: TCart = {
      product: productsData[0],
      quantity: 1,
      userId: userData[0].id,
    };
    store.dispatch(addToCart(cartItem));
    expect(store.getState().cart.items[0]).toMatchObject({
      quantity: 1,
      product: productsData[0],
    });
  });

  test("should increase cart value", () => {
    const cartItem = {
      product: productsData[0],
      quantity: 1,
      userId: userData[0].id,
    };
    store.dispatch(increaseCartItemQuantity(cartItem));
    expect(store.getState().cart.totalQuantity).toBe(2);
  });

  test("should decrease cart value", () => {
    const cartItem = {
      product: productsData[0],
      quantity: 1,
      userId: userData[0].id,
    };
    store.dispatch(decreaseCartItemQuantity(cartItem));
    expect(store.getState().cart.totalQuantity).toBe(1);
  });

  test("should remove item from cart", () => {
    store.dispatch(removeFromCart(productsData[0]));
    expect(store.getState().cart.totalQuantity).toBe(0);
  });
});
