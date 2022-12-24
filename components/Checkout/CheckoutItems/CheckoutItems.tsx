import Image from "next/image";
import { FC } from "react";
import useSumForItem from "../../../hooks/useSumForItem";
import { ProductPage } from "../../../types/product/productPage";

interface CheckoutItemsProps {
  order: ProductPage;
}

const CheckoutItems: FC<CheckoutItemsProps> = ({ order }) => {
  const { sumPriceWithSale, sumPrice } = useSumForItem(
    order.quantity,
    order.price,
    order.sale
  );

  return (
    <div className="flex py-4 border-b border-[#d2a1a1] lg:min-w-[285px] xs:min-w-full xs:justify-around">
      <div className="mr-2 ">
        <Image src={order.img} alt={order.alt} width={90} height={90} />
      </div>
      <div className="w-[215px] lg:min-w-[225px]">
        <h4 className="font-bold text-xs pb-4">{order.model}</h4>
        <div className="text-xs flex">
          <p className="opacity-40 ">Color:&nbsp;</p>
          <p className="font-medium opacity-80">{order.color}</p>
        </div>
        <div className="text-xs flex">
          <p className="opacity-40 ">Size:&nbsp;</p>
          <p className="font-medium opacity-80">{order.size}</p>
        </div>
        <div className="flex items-center py-2">
          <div className="flex mr-2 items-center">
            <span className="mr-3">{order.quantity} Item</span>
          </div>
          <div className="flex items-center">
            <p className="text-sm font-bold text-red-500 pr-1">
              {sumPriceWithSale}
            </p>
            <p
              className={
                order.sale === 0
                  ? "hidden"
                  : "text-[10px] line-through decoration-2 decoration-red-500 xs:text-xs"
              }
            >
              {sumPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItems;
