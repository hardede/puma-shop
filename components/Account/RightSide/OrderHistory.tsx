import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  fetchHistory,
  selectError,
  selectHistory,
  selectIsLoading,
} from "../../../store/reducers/HistorySlice";
import { History } from "../../../types/history";
import OrderHistoryItem from "./OrderHistoryItem/OrderHistoryItem";

const OrderHistory: FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  return (
    <div className="md:mt-10">
      <h5 className="after:mt-3 after:block after:bg-[#d2a1a1] after:w-[520px] after:h-0.5 text-xl xl:after:w-[450px] lg:after:w-full">
        Order history
      </h5>
      <div className="">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <>
            {history.length === 0 ? (
              <div className="mt-5 font-medium">You have no orders now</div>
            ) : (
              <>
                {history.map((order: History) => (
                  <OrderHistoryItem key={order._id} order={order} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
