import { rest } from "msw";
import { productsData } from "../test/testData/productData";
import { setupServer } from "msw/node";
import { ProductInputsData, TProduct } from "../@types/product";

export const productsHandlers = [
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),

  rest.get(`https://api.escuelajs.co/api/v1/products/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const foundIndex = productsData.findIndex(
      (item: TProduct) => item.id === Number(id)
    );
    if (foundIndex !== -1) {
      return res(ctx.json(productsData[foundIndex]));
    }
    return res(ctx.json(productsData[0]));
  }),
];

rest.post("https://api.escuelajs.co/api/v1/products", async (req, res, ctx) => {
  let data: ProductInputsData | {} = {};
  await req.json().then((res) => (data = res));
  return res(ctx.json({ data }));
});

rest.put("/products/:id", async (req, res, ctx) => {
  const { id } = req.params;
  const findIndex = productsData.findIndex((p) => p.id === Number(id));
  if (findIndex !== -1) {
    const data = await req.json();
    const updatedProduct = { ...productsData[findIndex], ...data };
    return res(ctx.json(updatedProduct));
  }
});

rest.delete("/products/:id", async (req, res, ctx) => {
  const { id } = req.params;
  const findIndex = productsData.findIndex((p) => p.id === Number(id));
  if (findIndex !== -1) {
    return res(ctx.json(true));
  }

  return res(ctx.json(false));
});

const productsServer = setupServer(...productsHandlers);

export default productsServer;
