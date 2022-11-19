import { v4 as uuidv4 } from "uuid";

export const adminLinks = [
  {
    id: uuidv4(),
    name: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    id: uuidv4(),
    name: "Orders",
    href: "/admin/orders",
  },
  {
    id: uuidv4(),
    name: "Products",
    href: "/admin/products",
  },
  {
    id: uuidv4(),
    name: "Users",
    href: "/admin/users",
  },
];
