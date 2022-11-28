import { ProductPage } from "./product/productPage";

export interface shippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  city: string;
}

export interface History {
  _id: string;
  totalPrice: string;
  totalQuantity: number;
  totalValueString: string;
  discount: number;
  discountString: string;
  activeCard: boolean;
  discountByCardString: string;
  totalPriceWithCard: number;
  totalPriceWithCardString: string;
  shippingAddress: shippingAddress;
  orderItems: ProductPage[];
  paidAt: string;
  deliveredAt: string;
}
