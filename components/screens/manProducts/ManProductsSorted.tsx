import { FC } from "react";
import { ProductPage } from "../../../types/product/productPage";
import Layout from "../../Layout/Layout";
import SortedMan from "../../SortedProducts/SortedMan";

interface ManProductsSortedProps {
  products: ProductPage[];
}

const ManProductsSorted: FC<ManProductsSortedProps> = ({ products }) => {
  return (
    <Layout title="Man Products">
      <div className="container max-w-[1140px] m-auto">
        <SortedMan products={products} />
      </div>
    </Layout>
  );
};

export default ManProductsSorted;
