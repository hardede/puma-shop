import Image from "next/image";
import { FC, useRef, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import dateNow from "../../../../helpers/dateNow";
import { History } from "../../../../types/history";
import { ProductPage } from "../../../../types/product/productPage";

interface OrderHistoryItemProps {
  order: History;
}

const OrderHistoryItem: FC<OrderHistoryItemProps> = ({ order }) => {
  const { currentDate } = dateNow();
  const [openOrder, setOpenOrder] = useState(false);
  const nodeRef = useRef(null);
  return (
    <div className="transition ease-in-out duration-1000">
      <div
        className="flex justify-between items-center not-last:border-b-2 border-[#d2a1a1] py-5 cursor-pointer"
        onClick={() => setOpenOrder(!openOrder)}
      >
        <div>
          <p className="xs:text-sm">P{order._id.substring(0, 10)}</p>
          <p className="text-xs">{currentDate}</p>
        </div>
        <div className="flex items-center lg:mx-4 xs:text-sm xs:mx-2">
          {order.totalQuantity} products for the sum{" "}
          {order.activeCard ? order.totalPriceWithCardString : order.totalPrice}
          {openOrder ? (
            <MdArrowForwardIos className="ml-1 -rotate-90 text-3xl" />
          ) : (
            <MdArrowForwardIos className="ml-1 rotate-90 text-3xl" />
          )}
        </div>
        <div>Ordered...</div>
      </div>
      <CSSTransition
        classNames="order-history"
        in={openOrder}
        timeout={500}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <div>
            {order.orderItems.map((ordered: ProductPage) => (
              <div key={ordered._id}>
                <div className="flex justify-between py-3 border-b border-[#d2a1a1] xs:grid xs:grid-cols-[30%_70%]">
                  <div>
                    <Image
                      src={ordered.img}
                      alt={ordered.alt}
                      width={90}
                      height={90}
                    />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-xs font-semibold max-w-[190px] xs:max-w-full">
                      {ordered.model}
                    </h4>
                    <p className="text-xs pt-3 py-1">{ordered.quantity} Item</p>
                    <div className="text-sm flex items-center">
                      <p className="font-bold pr-1 xs:pr-6">
                        {ordered.sale === 0
                          ? ordered.price.toLocaleString().concat(",00 ???")
                          : Math.round(ordered.price * (ordered.sale / 100))
                              .toLocaleString()
                              .concat(",00 ???")}
                      </p>
                      {ordered.sale !== 0 && (
                        <p className="text-xs line-through decoration-2 decoration-red-500">
                          {ordered.price.toLocaleString().concat(",00 ???")}
                        </p>
                      )}
                    </div>
                  </div>
                  <ul className="pt-1 xs:col-span-2">
                    <li className="flex text-xs w-[180px] xs:w-full">
                      <p className="opacity-50">Color:&nbsp;</p>
                      <p className="lowercase font-medium opacity-80 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal">
                        {ordered.color}
                      </p>
                    </li>
                    <li className="flex text-xs">
                      <p className="opacity-50">Size:&nbsp;</p>
                      <p className="font-medium opacity-80">{ordered.size}</p>
                    </li>
                    <li className="flex text-xs pb-2">
                      <p className="opacity-50">Art.:&nbsp;</p>
                      <p className="font-medium opacity-80">{ordered.atr}</p>
                    </li>
                    <li className="flex text-xs">Ordered</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="flex py-0.5 justify-between mt-5 xs:block">
            <div className="xs:border-b xs:border-[#d2a1a1] xs:pb-2.5">
              <p>Delivery Address</p>
              <div className="text-sm text-[#666666]">
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </div>
              <div className="text-sm text-[#666666]">
                {order.shippingAddress.phone}
              </div>
              <div className="text-sm text-[#666666]">
                {order.shippingAddress.city}
              </div>
              <p>Estimated delivery time</p>
              <div className="text-sm text-[#666666]">{order.deliveredAt}</div>
            </div>
            <div className="w-[200px] xs:mt-5 xs:p-4 xs:w-full xs:border xs:border-[#d2a1a1]">
              <div className="flex justify-between items-center py-0.5 text-sm text-[#181818] xs:pb-1 ">
                <h4 className="font-semibold">Sum:</h4>
                <span>{order.totalValueString}</span>
              </div>
              <div
                className={
                  order.discount === 0
                    ? "hidden"
                    : "flex justify-between items-center py-0.5 text-sm text-[#181818] xs:pb-1"
                }
              >
                <h4 className="font-semibold">Discount:</h4>
                <span>-{order.discountString}</span>
              </div>
              <div
                className={
                  order.activeCard
                    ? "flex justify-between items-center py-0.5 text-sm text-[#181818] xs:pb-1"
                    : "hidden"
                }
              >
                <h4 className="font-semibold">Paying by card:</h4>
                <span>-{order.discountByCardString}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 text-sm text-[#181818] xs:pb-1">
                <h4 className="font-semibold">Delivery:</h4>
                <span>0</span>
              </div>
              <div className="flex justify-between items-center font-bold text-xl text-[#181818] xs:pb-1 xs:border-b-2 xs:border-[#e57474]">
                <h4 className="uppercase">All:</h4>
                {order.activeCard ? (
                  <span>{order.totalPriceWithCardString}</span>
                ) : (
                  <span>{order.totalPrice}</span>
                )}
              </div>
              <div className="mt-3">
                {order.activeCard ? (
                  <p className="text-[#181818] text-sm">Paid by card</p>
                ) : (
                  <p className="text-[#181818] text-sm">Paid by cash</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default OrderHistoryItem;
