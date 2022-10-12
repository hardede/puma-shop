import Image from "next/image";
import { GrClose } from "react-icons/gr";
import { MdArrowForwardIos } from "react-icons/md";
import { useAppDispatch } from "../../../hooks/redux";
import useSumForItem from "../../../hooks/useSumForItem";
import {
  cartRemove,
  decrementQuantity,
  incrementQuantity,
} from "../../../store/reducers/CartSlice";

const DrawerItems = ({ cart }: any) => {
  console.log(
    "🚀 ~ file: DrawerItems.tsx ~ line 13 ~ DrawerItems ~ cart",
    cart
  );
  const dispatch = useAppDispatch();

  const { newSumPrice, oldSumPrice } = useSumForItem(
    cart.quantity,
    cart.newPrice,
    cart.oldPrice
  );

  return (
    <div className="flex  py-4 border-b border-[#979797] first:pt-0">
      <div>
        <Image src={cart.img} alt={cart.alt} width={80} height={80} />
      </div>
      <div className="w-[350px] ml-4">
        <div className="flex justify-between">
          <h2 className="max-w-[300px] text-lg font-medium mb-2">
            {cart.model}
          </h2>
          <GrClose
            className="text-xl opacity-100 hover:opacity-50"
            onClick={() => dispatch(cartRemove({ ...cart }))}
          />
        </div>
        <div className="flex text-sm">
          <h4 className="pr-1 text-[#979797]">Color:</h4>
          <p className="font-bold text-[#181818]">{cart.color}</p>
        </div>
        <div className="flex text-sm">
          <h4 className="pr-1 text-[#979797]">Size:</h4>
          <p className="font-bold text-[#181818]">{cart.size} EUR</p>
        </div>
        <div className="flex text-sm">
          <h4 className="pr-1 text-[#979797]">Art.:</h4>
          <p className="font-bold text-[#181818]">{cart.atr}</p>
        </div>
        <div className="flex justify-start items-center mt-3 text-lg">
          <div className="flex mr-10 items-center">
            <span className="w-[60px] mr-3">{cart.quantity} Items</span>
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
          <span
            className={
              cart.oldPrice
                ? "font-bold text-[#ae946d] pr-4"
                : "font-bold text-black pr-4"
            }
          >
            {newSumPrice}
          </span>
          <span className="font-normal text-[#555555] line-through decoration-2 decoration-[#ae946d]">
            {cart.oldPrice ? oldSumPrice : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DrawerItems;
