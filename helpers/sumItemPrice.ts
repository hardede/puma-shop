import { selectCartState } from "../store/reducers/CartSlice";
import { useAppSelector } from "../hooks/redux";

const useSumItemPrice = () => {
  const cartState = useAppSelector(selectCartState);

  let newSumPrice = "";
  let oldSumPrice = "";
  cartState.map((item: any) => {
    newSumPrice = `${(item.quantity * item.newPrice.toString().split(" "))
      .toLocaleString()
      .concat(",00 ₴")}`;

    oldSumPrice = `${(
      item.quantity * (item.oldPrice ? item.oldPrice : 0).toString().split(" ")
    )
      .toLocaleString()
      .concat(",00 ₴")}`;
  });
  return {
    newSumPrice,
    oldSumPrice,
  };
};

export default useSumItemPrice;
