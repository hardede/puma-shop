import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
    fetchAdminOrders,
    selectOrders,
    selectOrdersError,
    selectOrdersIsLoading
} from "../../store/reducers/AdminOrderSlice";
import { History } from "../../types/history";
import { adminLinks } from "../constants/adminLinks";



interface AdminOrderProps extends History {
  createdAt: string;
}

const AdminMenuOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const isLoading = useAppSelector(selectOrdersIsLoading);
  const error = useAppSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  return (
      <div className="overflow-x-auto md:col-span-3">
        <h1 className="mb-4 text-xl">Admin Orders</h1>

        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="p-5 text-left">USER</th>
                  <th className="p-5 text-left">DATE</th>
                  <th className="p-5 text-left">TOTAL</th>
                  <th className="p-5 text-left">PAID</th>
                  <th className="p-5 text-left">DELIVERED</th>
                  <th className="p-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: AdminOrderProps) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-5">{order._id.substring(20, 24)}</td>
                    <td className="p-5">
                      {order.shippingAddress
                        ? order.shippingAddress.firstName
                        : "DELETED USER"}
                    </td>
                    <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-5">{order.totalPrice}</td>
                    <td className="p-5">
                      {order.activeCard ? (
                        <div className="">Paid by Card</div>
                      ) : (
                        "Not paid"
                      )}
                    </td>
                    <td className="p-5">
                      {new Date(
                        order.deliveredAt.split(".").reverse().join("-")
                      ) < new Date()
                        ? `order in ${order.shippingAddress.city}`
                        : `~${order.deliveredAt}`}
                    </td>
                    <td className="p-5">
                      <Link href={`/order/${order._id}`} passHref>
                        <a>Details</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  );
};

export default AdminMenuOrders;
