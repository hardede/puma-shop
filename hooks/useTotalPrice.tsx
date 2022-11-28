import { selectCartState } from "../store/reducers/CartSlice";
import { ProductPage } from "../types/product/productPage";
import { useAppSelector } from "./redux";

const useTotalPrice = () => {
  const cartState = useAppSelector(selectCartState);
  let totalQuantity = 0;
  let totalValue = 0;
  let totalValueString = "";
  let totalPrice = "";
  let totalPriceWithSale = "";
  let discountString = "";
  let discountByCardString = "";
  let totalPriceWithCardString = "";
  let sumPrice = 0;
  let sumPriceWithSale = 0;
  let discount = 0;
  let discountByCard = 0;
  let totalPriceWithCard = 0;
  cartState.forEach((item: ProductPage) => {
    totalQuantity += item.quantity;
    item.sale === 0 ? (sumPrice += item.price * item.quantity) : 0;
    item.sale !== 0
      ? (sumPriceWithSale +=
          Math.round(item.price * (item.sale / 100)) * item.quantity)
      : 0;

    totalValue += item.price * item.quantity;
    totalValueString = `${totalValue.toLocaleString().concat(",00 ₴")}`;

    totalPrice = `${(sumPrice + sumPriceWithSale)
      .toLocaleString()
      .concat(",00 ₴")}`;
    totalPriceWithSale = `${sumPriceWithSale.toLocaleString().concat(",00 ₴")}`;

    discount = totalValue - (sumPrice + sumPriceWithSale);
    discountString = `${discount.toLocaleString().concat(",00 ₴")}`;

    discountByCard = Math.round((sumPrice + sumPriceWithSale) * 0.05);
    discountByCardString = `${discountByCard.toLocaleString().concat(",00 ₴")}`;

    totalPriceWithCard = Math.round(
      sumPrice + sumPriceWithSale - discountByCard
    );
    totalPriceWithCardString = `${totalPriceWithCard
      .toLocaleString()
      .concat(",00 ₴")}`;
  });
  return {
    sumPrice,
    sumPriceWithSale,
    totalValueString,
    totalPrice,
    totalPriceWithSale,
    totalQuantity,
    discountString,
    discount,
    discountByCard,
    discountByCardString,
    totalPriceWithCard,
    totalPriceWithCardString,
  };
};

export default useTotalPrice;
