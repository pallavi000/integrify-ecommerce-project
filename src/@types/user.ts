export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs extends LoginInputs {
  name: string;
  role: "customer" | "admin";
  avatar: string;
}

export type TUserRole = "customer" | "admin";

export type TUser = {
  id: number;
  email: string;
  name: string;
  role: TUserRole | null;
  avatar: string;
  creationAt: string;
  updatedAt: string;
};

export type UserAddressInputs = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};
