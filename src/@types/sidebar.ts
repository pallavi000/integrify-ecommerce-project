export type SidebarTitle =
  | "Dashboard"
  | "Users"
  | "Categories"
  | "Products"
  | "Orders";

export type SidebarPath =
  | "/admin/dashboard"
  | "/admin/users"
  | "/admin/categories"
  | "/admin/products"
  | "/admin/orders";

export type SidebarItem = {
  title: SidebarTitle;
  path: SidebarPath;
  icon: React.ReactNode;
};
