import { v4 as uuidv4 } from "uuid";

export const adminSummary = [
  {
    id: uuidv4(),
    name: "View sales",
    summary: "ordersPrice",
    href: "/admin/orders",
  },
  {
    id: uuidv4(),
    name: "View orders",
    summary: "ordersCount",
    href: "/admin/orders",
  },
  {
    id: uuidv4(),
    name: "View products",
    summary: "productsCount",
    href: "/admin/products",
  },
  {
    id: uuidv4(),
    name: "View users",
    summary: "usersCount",
    href: "/admin/users",
  },
];
