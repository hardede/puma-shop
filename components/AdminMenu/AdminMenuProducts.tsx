import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchAdminProducts,
  selectAdminProducts,
  selectAdminProductsError,
  selectAdminProductsIsLoading,
} from "../../store/reducers/Admin/AdminProductsSlice";
import { ProductPage } from "../../types/product/productPage";
import ProductInfo from "./ProductInfo/ProductInfo";

const AdminMenuProducts = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAdminProducts);
  const isLoading = useAppSelector(selectAdminProductsIsLoading);
  const error = useAppSelector(selectAdminProductsError);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto md:col-span-3">
      <h1 className="mb-4 text-xl">Products</h1>
      {isLoading ? (
        <div className="block border-4 border-red-500 rounded-full border-dashed w-28 h-28 mx-auto mt-20 text-center pt-10 text-red-500 animate-rotateLoader">
          Loading...
        </div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-3 text-left">ID</th>
                <th className="p-3 text-left">NAME</th>
                <th className="p-3 text-left">PRICE</th>
                <th className="p-3 text-left">DISCOUNT</th>
                <th className="p-3 text-left">COUNT</th>
                <th className="p-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: ProductPage) => (
                <ProductInfo key={product._id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMenuProducts;
