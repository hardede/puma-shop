import { v4 as uuidv4 } from "uuid";

export const adminLinks = [
  {
    id: uuidv4(),
    link: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    id: uuidv4(),
    link: "Orders",
    href: "/admin/orders",
  },
  {
    id: uuidv4(),
    link: "Products",
    href: "/admin/products",
  },
  {
    id: uuidv4(),
    link: "Users",
    href: "/admin/users",
  },
];
