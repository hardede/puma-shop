import { useAppSelector } from "../../../hooks/redux";
import { selectHistory } from "../../../store/reducers/OrderedSlice";
import { History } from "../../../types/history";
import OrderHistoryItem from "./OrderHistoryItem/OrderHistoryItem";

const OrderHistory = () => {
  const history = useAppSelector(selectHistory);

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
              <OrderHistoryItem key={order.id} order={order} index={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
