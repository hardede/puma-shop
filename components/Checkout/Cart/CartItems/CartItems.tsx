import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import { useAppDispatch } from "../../../../hooks/redux";
import useSumForItem from "../../../../hooks/useSumForItem";
import {
    cartRemove,
    decrementQuantity,
    incrementQuantity
} from "../../../../store/reducers/CartSlice";
import { OrderedProduct } from "../../../../types/orderProduct";

interface CartItemsProps {
  orderCart: OrderedProduct;
}

const CartItems: FC<CartItemsProps> = ({ orderCart }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { newSumPrice, oldSumPrice } = useSumForItem(
    orderCart.quantity,
    orderCart.newPrice,
    orderCart.oldPrice
  );

  return (
    <div className="flex not-last:border-b border-[#d2a1a1] not-first:pt-10 pb-10">
      <div className="mr-8">
        <Image
          src={orderCart.img}
          alt={orderCart.alt}
          width={140}
          height={140}
        />
        <div className="flex items-center justify-center">
          <AiOutlineCheckCircle className="text-green-500 mr-2" />
          <p className="text-[#aaa] text-center">In stock</p>
        </div>
      </div>
      <div>
        <h4 className="font-light text-xl pb-4">{orderCart.model}</h4>
        <p className="text-[#aaa] text-sm">Color: {orderCart.color}</p>
        <p className="text-[#aaa] text-sm">Size: {orderCart.size}</p>
        <p className="text-[#aaa] text-sm">Art: {orderCart.atr}</p>
        <div className="flex items-center py-2">
          <div className="flex mr-10 items-center">
            <span className="mr-3">{orderCart.quantity} Item</span>
            <div className="">
              {orderCart.quantity === orderCart.countInStock ? (
                <MdArrowForwardIos className="-rotate-90 cursor-pointer opacity-30" />
              ) : (
                <MdArrowForwardIos
                  className="-rotate-90 cursor-pointer"
                  onClick={() => dispatch(incrementQuantity({ ...orderCart }))}
                />
              )}
              {orderCart.quantity === 1 ? (
                <MdArrowForwardIos className="rotate-90 cursor-pointer opacity-30" />
              ) : (
                <MdArrowForwardIos
                  className="rotate-90 cursor-pointer"
                  onClick={() => dispatch(decrementQuantity({ ...orderCart }))}
                />
              )}
            </div>
          </div>
          <div>
            <p
              className={
                orderCart.oldPrice === 0
                  ? "hidden"
                  : "line-through decoration-2 decoration-red-500"
              }
            >
              {oldSumPrice}
            </p>
            <p className="text-xl font-bold text-red-500">{newSumPrice}</p>
          </div>
        </div>
        <div className="flex">
          <div
            className="cursor-pointer mr-5 border-b border-black"
            onClick={() => router.back()}
          >
            Change
          </div>
          <div
            className="cursor-pointer border-b border-black"
            onClick={() => dispatch(cartRemove({ ...orderCart }))}
          >
            Delete item
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
