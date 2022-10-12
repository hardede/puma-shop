import Link from "next/link";
import { FC } from "react";
import { GrClose } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useTotalPrice from "../../hooks/useTotalPrice";
import { selectIsAuth } from "../../store/reducers/AuthSlice";
import { selectCartState } from "../../store/reducers/CartSlice";
import DrawerItems from "./DrawerItems/DrawerItems";

interface DrawerProps {
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({ onClose }) => {
  const cartState = useAppSelector(selectCartState);
  const isAuth = useAppSelector(selectIsAuth);

  const { totalPrice } = useTotalPrice();
  return (
    <div
      className="fixed left-0 top-0 w-full h-full bg-[#00000088] z-50 "
      onClick={onClose}
    >
      <div
        className="absolute w-[540px] h-screen top-0 right-0 bg-white py-[30px] px-[40px] z-50 text-black"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center uppercase text-sm font-bold mb-[30px]">
              <div className="flex">
                <p className="pr-4">Shopping Cart</p>
                {cartState.length > 0 ? (
                  <span className="">
                    ({cartState.reduce((a: any, c: any) => a + c.quantity, 0)})
                  </span>
                ) : (
                  <span>(0)</span>
                )}
              </div>
              <GrClose
                className="text-2xl opacity-100 hover:opacity-50"
                onClick={onClose}
              />
            </div>
            <div className="mb-4 max-h-[600px] overflow-y-scroll">
              {cartState.length <= 0 ? (
                <h3 className="text-center font-bold text-xl">
                  Your basket is empty
                </h3>
              ) : (
                <div className="max-h-[480px] scroll">
                  {cartState.map((cart: any) => (
                    <DrawerItems key={uuidv4()} cart={cart} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center py-3 border-b border-[#979797] text-sm text-[#181818]">
              <h4 className="uppercase">Sum</h4>
              <span>{totalPrice}</span>
            </div>
            <div className="flex justify-between items-center mb-7 py-3 border-b border-[#979797] font-bold text-xl text-[#181818]">
              <h4 className="uppercase">All</h4>
              <span>{totalPrice}</span>
            </div>
            {isAuth ? (
              <Link href="/checkout">
                <a className="bg-[#ae946d] block text-center text-white py-2.5  uppercase font-bold text-xl hover:bg-[#b7a07d] transition-all ease-in-out duration-300">
                  checkout
                </a>
              </Link>
            ) : (
              <Link href="/authorization">
                <a className="bg-[#ae946d] block text-center text-white py-2.5  uppercase font-bold text-xl hover:bg-[#b7a07d] transition-all ease-in-out duration-300">
                  checkout
                </a>
              </Link>
            )}
            <div className="text-center mt-3">
              {isAuth ? (
                <Link href="/checkout/cart">
                  <a className="text-[#181818] pb-1 uppercase font-medium text-sm transition-all ease-in-out duration-500 border-b border-[#cccccc] hover:border-[#5a5a5a]">
                    go to cart
                  </a>
                </Link>
              ) : (
                <Link href="/authorization">
                  <a className="text-[#181818] pb-1 uppercase font-medium text-sm transition-all ease-in-out duration-500 border-b border-[#cccccc] hover:border-[#5a5a5a]">
                    go to cart
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
