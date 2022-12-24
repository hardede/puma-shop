import Link from "next/link";
import { useRef, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../../hooks/redux";
import useTotalPrice from "../../../hooks/useTotalPrice";
import { selectCartState } from "../../../store/reducers/CartSlice";
import { ProductPage } from "../../../types/product/productPage";
import CheckoutItems from "../CheckoutItems/CheckoutItems";

const PhoneCheckout = () => {
  const cartState = useAppSelector(selectCartState);
  const [cartOpen, setCartOpen] = useState(false)
  const { totalPrice, totalQuantity } = useTotalPrice();
  const elementRef = useRef(null);
  const scrollDistance = 285;

  const handleClickNext = () => {
    elementRef.current.scrollTo({
      left: elementRef.current.scrollLeft + scrollDistance,
      behavior: "smooth",
    });
  };
  const handleClickPrev = () => {
    elementRef.current.scrollTo({
      left: elementRef.current.scrollLeft - scrollDistance,
      behavior: "smooth",
    });
  };

  return (
    <div className="pt-4 ">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center font-medium text-lg text-[#181818] md:font-normal md:text-base">
          <h4 className="uppercase mr-4 md:mr-2 xs:lowercase">Shopping Cart</h4>
          <span className="md:text-red-500">{totalPrice}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-4 md:mr-2 xs:hidden">{totalQuantity} Items</span>
          <Link href="/checkout/cart">Change</Link>
          <div className="flex xs:hidden">
            <MdArrowForwardIos
              onClick={handleClickPrev}
              className="ml-4 rotate-180 md:ml-2"
            />
            <MdArrowForwardIos onClick={handleClickNext} />
          </div>
          <div className="hidden xs:block">
            <MdArrowForwardIos
              onClick={() => setCartOpen(!cartOpen)}
              className="ml-4 rotate-90 md:ml-2 xs:mx-2 xs:text-xl"
            />
          </div>
        </div>
      </div>
      <div
        ref={elementRef}
        className={
          cartOpen
            ? "mb-4 flex overflow-x-auto xs:overflow-x-hidden xs:block"
            : "mb-4 flex overflow-x-auto xs:overflow-x-hidden xs:hidden"
        }
      >
        {cartState.map((order: ProductPage) => (
          <CheckoutItems key={uuidv4()} order={order} />
        ))}
      </div>
    </div>
  );
};

export default PhoneCheckout;
