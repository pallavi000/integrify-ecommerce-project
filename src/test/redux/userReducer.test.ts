import { RegisterInputs, TUser } from "../../@types/user";
import {
  addNewUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/reducers/admin/adminUserReducer";
import store from "../../redux/store";
import usersServer from "../../server/userServer";
import { userData } from "../testData/userData";

describe("user reducers", () => {
  test("should fetch all users", async () => {
    await store.dispatch(fetchUsers());
    expect(store.getState().adminUsers.data.length).toBe(3);
  });

  test("should register new user", async () => {
    const data: RegisterInputs = {
      name: "test user",
      email: "test@gmail.com",
      password: "12345",
      role: "customer",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6355",
    };
    const res = await store.dispatch(addNewUser(data));
    expect(res.meta.arg).toMatchObject({
      name: "test user",
      email: "test@gmail.com",
      password: "12345",
      role: "customer",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6355",
    });
  });

  test("should update user data", async () => {
    const data: TUser = {
      id: 2,
      email: "test@mail.com",
      name: "Maria",
      role: "customer",
      avatar: "https://i.imgur.com/00qWleT.jpeg",
      creationAt: "2023-10-03T19:00:54.000Z",
      updatedAt: "2023-10-03T19:00:54.000Z",
    };
    const res = await store.dispatch(updateUser(data));
    expect(res.meta.arg).toMatchObject({
      id: 2,
      email: "test@mail.com",
      name: "Maria",
      role: "customer",
      avatar: "https://i.imgur.com/00qWleT.jpeg",
      creationAt: "2023-10-03T19:00:54.000Z",
      updatedAt: "2023-10-03T19:00:54.000Z",
    });
  });

  test("should delete product by id", async () => {
    const res = store.dispatch(deleteUser({ id: 1 }));
    expect(res.arg.id).toBe(1);
  });
});

beforeAll(() => usersServer.listen());

afterEach(() => usersServer.resetHandlers());

afterAll(() => usersServer.close());
