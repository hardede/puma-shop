import Image from "next/image";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useAppSelector } from "../../../hooks/redux";
import useDate from "../../../hooks/useDate";
import {
  selectHistory,
  selectOrderedState,
} from "../../../store/reducers/OrderedSlice";
import { History } from "../../../types/history";
import { OrderedProduct } from "../../../types/orderProduct";
import OrderHistoryItem from "./OrderHistoryItem/OrderHistoryItem";

const OrderHistory = () => {
  const history = useAppSelector(selectHistory);
  const { currentDate } = useDate();
  const [openOrder, setOpenOrder] = useState(false);

  return (
    <div>
      <h5 className="after:mt-3 after:block after:bg-[#d2a1a1] after:w-[520px] after:h-0.5 text-xl">
        Order history
      </h5>
      <div className="">
        {history.length === 0 ? (
          <div className="mt-5">You have no orders now</div>
        ) : (
          <>
            {history.map((order: History, index: number) => (
              <OrderHistoryItem key={order.id} order={order} index={index}/>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
