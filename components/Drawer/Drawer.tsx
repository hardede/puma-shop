import { useRouter } from "next/router";
import { FC } from "react";
import { GrClose } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../hooks/redux";
import useTotalPrice from "../../hooks/useTotalPrice";
import { selectCartState } from "../../store/reducers/CartSlice";
import { ProductPage } from "../../types/product/productPage";
import DrawerItems from "./DrawerItems/DrawerItems";

interface DrawerProps {
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({ onClose }) => {
  const cartState = useAppSelector(selectCartState);
  const router = useRouter();

  const { totalPrice, totalQuantity } = useTotalPrice();
  return (
    <div onClick={onClose}>
      <div
        className="absolute w-[540px] h-screen top-0 right-0 bg-white py-[30px] px-[40px] z-[100] text-black sm:p-5 sm:w-screen"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center uppercase text-sm font-bold mb-[30px]">
              <div className="flex">
                <p className="pr-4">Shopping Cart</p>
                {cartState.length > 0 ? (
                  <span className="">({totalQuantity})</span>
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
                <div className="max-h-[480px] scroll ">
                  {cartState.map((cart: ProductPage) => (
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
            <button
              className="block mx-auto px-12 mb-2 bg-[#ae946d] text-white py-2.5 uppercase font-bold text-xl hover:bg-[#b7a07d] transition-all ease-in-out duration-300"
              onClick={() => router.push("/authorization?redirect=/checkout")}
            >
              Check Out
            </button>
            <button
              className="block mx-auto text-[#181818] pb-1 uppercase font-medium text-sm transition-all ease-in-out duration-500 border-b border-[#cccccc] hover:border-[#5a5a5a]"
              onClick={() =>
                router.push("/authorization?redirect=/checkout/cart")
              }
            >
              go to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
