import { fetchAllProducts } from "../../redux/reducers/productsReducer";
import store from "../../redux/store";
import { fetchProductById } from "../../redux/reducers/productReducer";
import productsServer from "../../server/productServer";
import {
  addNewProduct,
  deleteAdminProduct,
  updateAdminProduct,
} from "../../redux/reducers/admin/adminProductReducer";

beforeAll(() => productsServer.listen());

afterEach(() => productsServer.resetHandlers());

afterAll(() => productsServer.close());

describe("product reducers", () => {
  test("should successfully fetch all products", async () => {
    await store.dispatch(fetchAllProducts({ offset: 0, limit: 10 }));
    expect(store.getState().products.data.length).toBe(3);
  });

  test("should fetch single product", async () => {
    await store.dispatch(fetchProductById({ id: 9 }));
    expect(store.getState().product.data).toMatchObject({
      id: 9,
      title: "Bespoke Wooden Shirt",
      price: 551,
      description:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      category: {
        id: 5,
        name: "Others",
        image: "https://placeimg.com/640/480/any?r=0.591926261873231",
      },
      images: [
        "https://placeimg.com/640/480/any?r=0.9178516507833767",
        "https://placeimg.com/640/480/any?r=0.9300320592588625",
        "https://placeimg.com/640/480/any?r=0.8807778235430017",
      ],
    });
  });

  test("should add new product", async () => {
    let data = {
      id: 100,
      title: "new product",
      price: 123,
      description: "it is a new product",
      categoryId: 1,
      image: "https://www.google.com",
      images: ["https://www.google.com"],
    };
    const res = await store.dispatch(addNewProduct(data));
    expect(res.meta.arg).toMatchObject({
      id: 100,
      title: "new product",
      price: 123,
      description: "it is a new product",
      categoryId: 1,
      image: "https://www.google.com",
      images: ["https://www.google.com"],
    });
  });

  test("should update product data", async () => {
    let data = {
      id: 9,
      title: "new product",
      price: 123,
      description: "it is a new product",
      categoryId: 1,
      image: "https://www.google.com",
      images: ["https://www.google.com"],
    };

    const res = store.dispatch(updateAdminProduct(data));
    expect(res.arg).toMatchObject({
      id: 9,
      title: "new product",
      price: 123,
      description: "it is a new product",
      categoryId: 1,
      image: "https://www.google.com",
      images: ["https://www.google.com"],
    });
  });

  test("should delete product by id", async () => {
    const res = store.dispatch(deleteAdminProduct({ id: 9 }));
    expect(res.arg.id).toBe(9);
  });
});
