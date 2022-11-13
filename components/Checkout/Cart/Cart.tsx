import Link from "next/link";
import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import useTotalPrice from "../../../hooks/useTotalPrice";
import { selectCartState } from "../../../store/reducers/CartSlice";
import { ProductPage } from "../../../types/product/productPage";
import CartItems from "./CartItems/CartItems";

const Cart: FC = () => {
  const cartState = useAppSelector(selectCartState);

  const { totalPrice } = useTotalPrice();

  return (
    <div className="flex justify-between">
      <div>
        {cartState.map((orderCart: ProductPage) => (
          <CartItems key={orderCart._id} orderCart={orderCart} />
        ))}
      </div>
      <aside className="w-[350px]">
        <h4 className="mb-3 text-xl font-bold">Order details</h4>
        <div className="flex justify-between items-center py-3 border-b border-[#d2a1a1] text-xs text-[#181818]">
          <h4 className="uppercase">Sum</h4>
          <span>{totalPrice}</span>
        </div>
        <div className="flex justify-between items-center mb-7 py-3 border-b border-[#d2a1a1] font-bold text-xl text-[#181818]">
          <h4 className="uppercase">All</h4>
          <span>{totalPrice}</span>
        </div>
        <Link href="/checkout">
          <a className="bg-[#f00] block text-center text-white py-2.5  uppercase font-bold text-xl hover:bg-[#c00] transition-all ease-in-out duration-300">
            checkout
          </a>
        </Link>
      </aside>
    </div>
  );
};

export default Cart;
