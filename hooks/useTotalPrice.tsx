import { selectCartState } from "../store/reducers/CartSlice";
import { useAppSelector } from "./redux";

const useTotalPrice = () => {
  const cartState = useAppSelector(selectCartState);
  let totalQuantity = 0;
  let totalPrice = "";
  let totalPriceOld = "";
  let discountString = "";
  let discountByCardString = "";
  let totalPriceWithCardString = "";
  let sumPriceNew = 0;
  let sumPriceOld = 0;
  let discount = 0;
  let discountByCard = 0;
  let totalPriceWithCard = 0;
  cartState.forEach((item: any) => {
    totalQuantity += item.quantity;
    sumPriceNew += +item.newPrice * item.quantity;
    sumPriceOld +=
      +item.oldPrice === 0
        ? +item.newPrice * item.quantity
        : +item.oldPrice * item.quantity;

    totalPrice = `${sumPriceNew.toLocaleString().concat(",00 ₴")}`;
    totalPriceOld = `${sumPriceOld.toLocaleString().concat(",00 ₴")}`;

    discount = sumPriceOld - sumPriceNew;
    discountString = `${discount.toLocaleString().concat(",00 ₴")}`;

    discountByCard = Math.round(sumPriceNew * 0.05);
    discountByCardString = `${discountByCard.toLocaleString().concat(",00 ₴")}`;

    totalPriceWithCard = Math.round(sumPriceNew - discountByCard);
    totalPriceWithCardString = `${totalPriceWithCard
      .toLocaleString()
      .concat(",00 ₴")}`;
  });
  return {
    sumPriceNew,
    sumPriceOld,
    totalPrice,
    totalPriceOld,
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
