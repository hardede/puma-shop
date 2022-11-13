import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  fetchOrders,
  selectError,
  selectHistory1,
  selectIsLoading,
} from "../../../store/reducers/HistorySlice";
import { History } from "../../../types/history";
import OrderHistoryItem from "./OrderHistoryItem/OrderHistoryItem";

const OrderHistory: FC = () => {
  const dispatch = useAppDispatch();
  const history1 = useAppSelector(selectHistory1);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div>
      <h5 className="after:mt-3 after:block after:bg-[#d2a1a1] after:w-[520px] after:h-0.5 text-xl">
        Order history
      </h5>
      <div className="">
        {history1.length === 0 ? (
          <div className="mt-5">You have no orders now</div>
        ) : (
          <>
            {history1.map((order: History, index: number) => (
              <OrderHistoryItem key={order._id} order={order} index={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
