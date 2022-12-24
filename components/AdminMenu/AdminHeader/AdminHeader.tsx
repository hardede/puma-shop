import Link from "next/link";
import { FC } from "react";
import { SummaryTypes } from "../../../types/summary";

interface AdminHeaderProps {
  summary: SummaryTypes;
}

const AdminHeader: FC<AdminHeaderProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 sm:gap-6 sm:text-center xs:grid-cols-1 xs:gap-0">
      <div className="card m-5 p-5 lg:m-2 lg:p-2">
        <p className="text-3xl">₴{summary.ordersPrice} </p>
        <p>Sales</p>
        <Link href="/admin/orders">View sales</Link>
      </div>
      <div className="card m-5 p-5 lg:m-2 lg:p-2">
        <p className="text-3xl">{summary.ordersCount} </p>
        <p>Orders</p>
        <Link href="/admin/orders">View orders</Link>
      </div>
      <div className="card m-5 p-5 lg:m-2 lg:p-2">
        <p className="text-3xl">{summary.productsCount} </p>
        <p>Products</p>
        <Link href="/admin/products lg:m-2 lg:p-2">View products</Link>
      </div>
      <div className="card m-5 p-5 lg:m-2 lg:p-2">
        <p className="text-3xl">{summary.usersCount} </p>
        <p>Users</p>
        <Link href="/admin/users">View users</Link>
      </div>
    </div>
  );
};

export default AdminHeader;
