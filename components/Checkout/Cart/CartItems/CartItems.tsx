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
  incrementQuantity,
} from "../../../../store/reducers/CartSlice";
import { ProductPage } from "../../../../types/product/productPage";

interface CartItemsProps {
  orderCart: ProductPage;
}

const CartItems: FC<CartItemsProps> = ({ orderCart }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { sumPrice, sumPriceWithSale } = useSumForItem(
    orderCart.quantity,
    orderCart.price,
    orderCart.sale
  );

  return (
    <div className="flex not-last:border-b border-[#d2a1a1] not-first:pt-10 pb-10 xs:block">
      <div className="mr-8 xs:text-center xs:w-full">
        <Image
          src={orderCart.img}
          alt={orderCart.alt}
          width={140}
          height={140}
          objectFit="contain"
        />
        <div className="flex items-center justify-center">
          <AiOutlineCheckCircle className="text-green-500 mr-2" />
          <p className="text-[#aaa] text-center">In stock</p>
        </div>
      </div>
      <div>
        <h4 className="font-light text-xl pb-4">{orderCart.model}</h4>
        <p className="text-[#aaa] text-sm xs:text-[#828282]">
          Color: {orderCart.color}
        </p>
        <p className="text-[#aaa] text-sm xs:text-[#828282]">
          Size: {orderCart.size}
        </p>
        <p className="text-[#aaa] text-sm xs:text-[#828282]">
          Art: {orderCart.atr}
        </p>
        <div className="flex items-center py-2 xs:block">
          <div className="flex mr-10 items-center xs:mb-2">
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
          <div className="xs:flex xs:justify-between xs:items-center">
            <p className="line-through decoration-2 decoration-red-500">
              {orderCart.sale !== 0 && sumPrice}
            </p>
            <p className="text-xl font-bold text-red-500">
              {orderCart.sale === 0 ? sumPrice : sumPriceWithSale}
            </p>
          </div>
        </div>
        <div className="flex xs:justify-between">
          <div
            className="cursor-pointer mr-5 border-b border-black"
            onClick={() => router.push("/")}
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
