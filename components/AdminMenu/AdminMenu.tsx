import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchSummary,
  selectSummary,
  selectSummaryError,
  selectSummaryIsLoading
} from "../../store/reducers/Admin/AdminSlice";
import { ChartTypes } from "../../types/chart";
import AdminHeader from "./AdminHeader/AdminHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesTypes {
  _id: string;
  totalSales: number;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const AdminMenu = () => {
  const dispatch = useAppDispatch();
  const summary = useAppSelector(selectSummary);
  const isLoading = useAppSelector(selectSummaryIsLoading);
  const error = useAppSelector(selectSummaryError);

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  let data = {} as ChartTypes;

  {
    !isLoading &&
      (data = {
        options: {
          legend: { display: true, position: "right" },
        },
        labels: summary.salesData.map((x: SalesTypes) => x._id),
        datasets: [
          {
            label: "Sales",
            backgroundColor: "rgba(162, 222, 208, 1)",
            data: summary.salesData.map((x: SalesTypes) => x.totalSales),
          },
        ],
      });
  }

  return (
    <div className="md:col-span-3">
      <h1 className="mb-4 text-xl">Admin Dashboard</h1>
      {isLoading ? (
        <div className="block border-4 border-red-500 rounded-full border-dashed w-28 h-28 mx-auto mt-20 text-center pt-10 text-red-500 animate-rotateLoader">
          Loading...
        </div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4">
            <AdminHeader summary={summary} />
          </div>
          <h2 className="text-xl">Sales Report</h2>
          <Bar data={data} />
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
