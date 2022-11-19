import axios from "axios";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import { adminLinks } from "../constants/adminLinks";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchSummary, selectSummary, selectSummaryError, selectSummaryIsLoading } from "../../store/reducers/AdminSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};


const AdminMenu = () => {
  const dispatch = useAppDispatch()
  const summary = useAppSelector(selectSummary)
  console.log("🚀 ~ file: AdminMenu.tsx ~ line 41 ~ AdminMenu ~ summary", summary)
  const isLoading = useAppSelector(selectSummaryIsLoading)
  const error = useAppSelector(selectSummaryError)

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);
  

  // const data = {
  //   labels: summary.salesData.map((x: any) => x._id), // 2022/01 2022/03
  //   datasets: [
  //     {
  //       label: "Sales",
  //       backgroundColor: "rgba(162, 222, 208, 1)",
  //       data: summary.salesData.map((x: any) => x.totalSales),
  //     },
  //   ],
  // };

  return (
    <div className="grid md:grid-cols-4 md:gap-5">
      <div>
        <ul>
          {adminLinks.map(link => (
            <li key={link.id}>
              <Link href={link.href}>
                <a>{link.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-3">
        <h1 className="mb-4 text-xl">Admin Dashboard</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="card m-5 p-5">
                <p className="text-3xl">${summary.ordersPrice} </p>
                <p>Sales</p>
                <Link href="/admin/orders">View sales</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">{summary.ordersCount} </p>
                <p>Orders</p>
                <Link href="/admin/orders">View orders</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">{summary.productsCount} </p>
                <p>Products</p>
                <Link href="/admin/products">View products</Link>
              </div>
              <div className="card m-5 p-5">
                <p className="text-3xl">{summary.usersCount} </p>
                <p>Users</p>
                <Link href="/admin/users">View users</Link>
              </div>
            </div>
            <h2 className="text-xl">Sales Report</h2>
            {/* <Bar
              options={{
                // legend: { display: true, position: "right" },
              }}
              data={data}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
