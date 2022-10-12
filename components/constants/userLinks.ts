import { v4 as uuidv4 } from "uuid";

export const userLinks = [
  {
    id: uuidv4(),
    link: "My Account",
    href: "/account",
  },
  {
    id: uuidv4(),
    link: "Orders",
    href: "/checkout/cart",
  },
];
