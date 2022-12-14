import Image from "next/image";
import { FC } from "react";
import { GrClose } from "react-icons/gr";
import { MdArrowForwardIos } from "react-icons/md";
import { useAppDispatch } from "../../../hooks/redux";
import useSumForItem from "../../../hooks/useSumForItem";
import {
  cartRemove,
  decrementQuantity,
  incrementQuantity,
} from "../../../store/reducers/CartSlice";
import { ProductPage } from "../../../types/product/productPage";

interface DrawerItemsProps {
  cart: ProductPage;
}

const DrawerItems: FC<DrawerItemsProps> = ({ cart }) => {
  const dispatch = useAppDispatch();

  const { sumPrice, sumPriceWithSale } = useSumForItem(
    cart.quantity,
    cart.price,
    cart.sale
  );

  return (
    <div className="flex py-4 border-b border-[#979797] first:pt-0">
      <div className="sm:min-w-[80px] sm:min-h-[80px]">
        <Image src={cart.img} alt={cart.alt} width={80} height={80} />
      </div>
      <div className="w-[350px] ml-4 sm:w-screen">
        <div className="flex justify-between">
          <h2 className="max-w-[300px] text-lg font-medium mb-2 xs:text-base xs:font-medium ">
            {cart.model}
          </h2>
          <GrClose
            className="text-xl opacity-100 hover:opacity-50"
            onClick={() => dispatch(cartRemove({ ...cart }))}
          />
        </div>
        <div className="flex text-sm">
          <h4 className="pr-1 text-[#979797]">Color:</h4>
          <p className="font-bold text-[#181818 xs:font-normal">{cart.color}</p>
        </div>
        <div className="flex text-sm">
          <h4 className="pr-1 text-[#979797]">Size:</h4>
          <p className="font-bold text-[#181818] xs:font-normal">
            {cart.size} EUR
          </p>
        </div>
        <div className="flex text-sm">
          <h4 className="pr-1 text-[#979797]">Art.:</h4>
          <p className="font-bold text-[#181818] xs:font-normal">{cart.atr}</p>
        </div>
        <div className="flex justify-start items-center mt-3 text-lg xs:text-base">
          <div className="flex mr-9 items-center xs:mr-2">
            <span className="w-[60px] mr-3 xs:mr-1">{cart.quantity} Items</span>
            <div className="">
              {cart.quantity === cart.countInStock ? (
                <MdArrowForwardIos className="-rotate-90 cursor-pointer opacity-30" />
              ) : (
                <MdArrowForwardIos
                  className="-rotate-90 cursor-pointer"
                  onClick={() => dispatch(incrementQuantity({ ...cart }))}
                />
              )}
              {cart.quantity === 1 ? (
                <MdArrowForwardIos className="rotate-90 cursor-pointer opacity-30" />
              ) : (
                <MdArrowForwardIos
                  className="rotate-90 cursor-pointer"
                  onClick={() => dispatch(decrementQuantity({ ...cart }))}
                />
              )}
            </div>
          </div>
          <div className="xs:flex xs:flex-col">
            <span className="font-bold text-[#ae946d] pr-4 xs:font-normal xs:pr-0">
              {cart.sale === 0 ? sumPrice : sumPriceWithSale}
            </span>
            <span className="font-normal text-[#555555] line-through decoration-2 decoration-[#ae946d] ">
              {cart.sale !== 0 && sumPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerItems;
