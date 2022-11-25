import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import dateNow from "../../helpers/dateNow";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchOrderDetails,
  selectOrderDetails,
  selectOrderDetailsError,
  selectOrderDetailsIsLoading,
} from "../../store/reducers/Admin/AdminOrderDetailsSlice";
import { ProductPage } from "../../types/product/productPage";

const AdminMenuDetails = () => {
  const { query } = useRouter();
  const orderId = query.id;
  const [openOrder, setOpenOrder] = useState(false);
  const nodeRef = useRef(null);

  const dispatch = useAppDispatch();
  const ordersDetails = useAppSelector(selectOrderDetails);
  const isLoading = useAppSelector(selectOrderDetailsIsLoading);
  const error = useAppSelector(selectOrderDetailsError);
  const { currentDate } = dateNow();

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <div className="">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <>
          <div
            key={ordersDetails._id}
            className="transition ease-in-out duration-1000"
          >
            <div
              className="flex justify-between items-center not-last:border-b-2 border-[#d2a1a1] py-5 cursor-pointer"
              onClick={() => setOpenOrder(!openOrder)}
            >
              <div>
                <p>P{ordersDetails._id.substring(0, 10)}</p>
                <p className="text-xs">{currentDate}</p>
              </div>
              <div className="flex items-center">
                {ordersDetails.totalQuantity} products for the sum{" "}
                {ordersDetails.activeCard
                  ? ordersDetails.totalPriceWithCardString
                  : ordersDetails.totalPrice}
                {openOrder ? (
                  <MdArrowForwardIos className="ml-1 -rotate-90" />
                ) : (
                  <MdArrowForwardIos className="ml-1 rotate-90" />
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
                  {ordersDetails.orderItems.map((ordered: ProductPage) => (
                    <div key={ordered._id}>
                      <div className="flex justify-between py-3 border-b border-[#d2a1a1]">
                        <div>
                          <Image
                            src={ordered.img}
                            alt={ordered.alt}
                            width={90}
                            height={90}
                          />
                        </div>
                        <div className="pt-1">
                          <h4 className="text-xs font-semibold max-w-[190px]">
                            {ordered.model}
                          </h4>
                          <p className="text-xs pt-3 py-1">
                            {ordered.quantity} Item
                          </p>
                          <div className="text-sm flex items-center">
                            <p className="font-bold pr-1">
                              {ordered.newPriceString}
                            </p>
                            {ordered.oldPrice !== 0 && (
                              <p className="text-xs line-through decoration-2 decoration-red-500">
                                {ordered.oldPriceString}
                              </p>
                            )}
                          </div>
                        </div>
                        <ul className="pt-1">
                          <li className="flex text-xs w-[180px]">
                            <p className="opacity-50">Color:&nbsp;</p>
                            <p className="lowercase font-medium opacity-80 truncate hover:text-clip hover:overflow-visible hover:whitespace-normal">
                              {ordered.color}
                            </p>
                          </li>
                          <li className="flex text-xs">
                            <p className="opacity-50">Size:&nbsp;</p>
                            <p className="font-medium opacity-80">
                              {ordered.size}
                            </p>
                          </li>
                          <li className="flex text-xs pb-2">
                            <p className="opacity-50">Art.:&nbsp;</p>
                            <p className="font-medium opacity-80">
                              {ordered.atr}
                            </p>
                          </li>
                          <li className="flex text-xs">Ordered</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex py-0.5 justify-between mt-5">
                  <div>
                    <p>Delivery Address</p>
                    <div className="text-sm text-[#666666]">
                      {ordersDetails.shippingAddress.firstName}{" "}
                      {ordersDetails.shippingAddress.lastName}
                    </div>
                    <div className="text-sm text-[#666666]">
                      {ordersDetails.shippingAddress.phone}
                    </div>
                    <div className="text-sm text-[#666666]">
                      {ordersDetails.shippingAddress.city}
                    </div>
                    <p>Estimated delivery time</p>
                    <div className="text-sm text-[#666666]">
                      {ordersDetails.deliveredAt}
                    </div>
                  </div>
                  <div className="w-[200px]">
                    <div className="flex justify-between items-center py-0.5 text-sm text-[#181818]">
                      <h4 className="font-semibold">Sum:</h4>
                      <span>{ordersDetails.totalPriceOld}</span>
                    </div>
                    <div
                      className={
                        ordersDetails.discount === 0
                          ? "hidden"
                          : "flex justify-between items-center py-0.5 text-sm text-[#181818]"
                      }
                    >
                      <h4 className="font-semibold">Discount:</h4>
                      <span>-{ordersDetails.discountString}</span>
                    </div>
                    <div
                      className={
                        ordersDetails.activeCard
                          ? "flex justify-between items-center py-0.5 text-sm text-[#181818]"
                          : "hidden"
                      }
                    >
                      <h4 className="font-semibold">Paying by card:</h4>
                      <span>-{ordersDetails.discountByCardString}</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 text-sm text-[#181818]">
                      <h4 className="font-semibold">Delivery:</h4>
                      <span>0</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-xl text-[#181818]">
                      <h4 className="uppercase">All:</h4>
                      {ordersDetails.activeCard ? (
                        <span>{ordersDetails.totalPriceWithCardString}</span>
                      ) : (
                        <span>{ordersDetails.totalPrice}</span>
                      )}
                    </div>
                    <div>
                      {ordersDetails.activeCard ? (
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
        </>
      )}
    </div>
  );
};

export default AdminMenuDetails;