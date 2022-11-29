import { FC } from "react";
import { ProductPage } from "../../../types/product/productPage";
import Layout from "../../Layout/Layout";
import SortedWoman from "../../SortedProducts/SortedWoman";

interface WomanProductsSortedProps {
  products: ProductPage[];
}

const WomanProductsSorted: FC<WomanProductsSortedProps> = ({ products }) => {
  return (
    <Layout title="Woman sorted products">
      <div className="container max-w-[1140px] mt-20 py-2 m-auto">
        <SortedWoman products={products} />
      </div>
    </Layout>
  );
};

export default WomanProductsSorted;
