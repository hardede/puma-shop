import { OrderedProduct } from "./orderProduct";

export interface History {
  id: string;
  quantity: number;
  totalPrice: string;
  totalPriceOld: string;
  discount: number;
  discountString: string;
  activeCard: boolean;
  discountByCardString: string;
  totalPriceWithCard: number;
  totalPriceWithCardString: string;
  orderedProducts: OrderedProduct[];
}
